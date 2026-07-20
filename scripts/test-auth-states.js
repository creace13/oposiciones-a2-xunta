const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');

function createMockElement(id) {
  return {
    id,
    value: '',
    textContent: '',
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    dataset: {},
    style: {},
    listeners: {},
    addEventListener(event, handler) { this.listeners[event] = handler; },
    setAttribute() {},
    removeAttribute() {},
    querySelector() { return this; },
    querySelectorAll() { return []; },
    showModal() { this.open = true; },
    close() { this.open = false; },
    click() { if (this.listeners.click) return this.listeners.click({ preventDefault() {}, stopPropagation() {} }); }
  };
}

function createMockSandbox(supabaseMock = null) {
  const elements = {};
  const mockElement = createMockElement('mock');
  const getOrCreateElement = (id) => {
    if (!elements[id]) elements[id] = createMockElement(id);
    return elements[id];
  };

  const sandbox = {
    window: {
      location: { hash: '' },
      supabase: supabaseMock ? { createClient: () => supabaseMock } : null,
      confirm: () => true,
      addEventListener: () => {},
      scrollTo: () => {}
    },
    document: {
      documentElement: {
        dataset: { authState: 'unauthenticated', authMode: 'none' }
      },
      getElementById: (id) => getOrCreateElement(id),
      querySelector: () => mockElement,
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    localStorage: {
      storage: {},
      getItem(k) { return this.storage[k] || null; },
      setItem(k, v) { this.storage[k] = String(v); },
      removeItem(k) { delete this.storage[k]; }
    },
    console,
    setTimeout,
    clearTimeout
  };

  sandbox.window.localStorage = sandbox.localStorage;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  sandbox.elements = elements;
  return sandbox;
}

console.log('--- SUITE DE 6 PRUEBAS DE AUTENTICACIÓN LOCAL ---');

async function runTests() {
  // Test 1: la autenticación remota queda pausada por decisión de producto.
  {
    const sb = createMockSandbox();
    assert.strictEqual(vm.runInContext('REMOTE_AUTH_ENABLED', sb), false, '❌ Test 1 Fallido: REMOTE_AUTH_ENABLED debe estar desactivado');
    console.log('✅ Test 1 Pasado: cuentas remotas pausadas por configuración.');
  }

  // Test 2: aunque exista Supabase, no se inicializa cliente remoto.
  {
    let createClientCalled = false;
    const sb = createMockSandbox({
      auth: { getSession: async () => ({ data: { session: null }, error: null }) }
    });
    sb.window.supabase = { createClient: () => { createClientCalled = true; return {}; } };
    sb.initSupabase('https://demo.supabase.co', 'public-key');
    assert.strictEqual(createClientCalled, false, '❌ Test 2 Fallido: se intentó crear cliente Supabase con remoto pausado');
    assert.strictEqual(vm.runInContext('supabaseClient', sb), null, '❌ Test 2 Fallido: supabaseClient debe quedar null');
    console.log('✅ Test 2 Pasado: Supabase no se inicializa cuando remoto está pausado.');
  }

  // Test 3: perfil guardado localmente -> authMode = guest.
  {
    const sb = createMockSandbox();
    sb.localStorage.setItem('opoA2UserName', 'Merce');
    await sb.checkAuthUser();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 3 Fallido: Perfil local debe ocultar authScreen');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'guest', '❌ Test 3 Fallido: authMode no es guest');
    console.log('✅ Test 3 Pasado: perfil local guardado activa modo local.');
  }

  // Test 4: botón de acceso local usa el nombre elegido y activa guest.
  {
    const sb = createMockSandbox();
    sb.document.getElementById('authPageName').value = 'Ricardo';
    const guestBtn = sb.document.getElementById('guestAccessBtn');
    assert.strictEqual(typeof guestBtn.listeners.click, 'function', '❌ Test 4 Fallido: Handler de guestAccessBtn no asignado');
    guestBtn.listeners.click();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 4 Fallido: Botón local debe dar acceso');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'guest', '❌ Test 4 Fallido: authMode no es guest');
    assert.strictEqual(sb.localStorage.getItem('opoA2UserName'), 'Ricardo', '❌ Test 4 Fallido: no guardó el nombre local elegido');
    console.log('✅ Test 4 Pasado: acceso local guarda nombre y activa modo invitado/local.');
  }

  // Test 5: el submit principal no llama a login remoto.
  {
    let signInCalled = false;
    const sb = createMockSandbox({
      auth: {
        signInWithPassword: async () => { signInCalled = true; return { data: null, error: null }; },
        getSession: async () => ({ data: { session: null }, error: null })
      }
    });
    sb.document.getElementById('authPageName').value = 'Opositora';
    const form = sb.document.getElementById('authPageForm');
    assert.strictEqual(typeof form.listeners.submit, 'function', '❌ Test 5 Fallido: Handler de authPageForm no asignado');
    await form.listeners.submit({ preventDefault() {} });
    assert.strictEqual(signInCalled, false, '❌ Test 5 Fallido: se llamó a signInWithPassword con remoto pausado');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'guest', '❌ Test 5 Fallido: no activó modo local');
    console.log('✅ Test 5 Pasado: submit entra localmente sin llamar a Supabase.');
  }

  // Test 6: crear cuenta y recuperación informan de pausa, sin llamar a Supabase.
  {
    let signUpCalled = false;
    let recoveryCalled = false;
    const sb = createMockSandbox({
      auth: {
        signUp: async () => { signUpCalled = true; return { data: null, error: null }; },
        resetPasswordForEmail: async () => { recoveryCalled = true; return { error: null }; },
        getSession: async () => ({ data: { session: null }, error: null })
      }
    });
    const signUpBtn = sb.document.getElementById('authPageSignUpBtn');
    const forgotBtn = sb.document.getElementById('authPageForgotPassBtn');
    if (signUpBtn.listeners.click) await signUpBtn.listeners.click();
    if (forgotBtn.listeners.click) await forgotBtn.listeners.click();
    assert.strictEqual(signUpCalled, false, '❌ Test 6 Fallido: se llamó a signUp con remoto pausado');
    assert.strictEqual(recoveryCalled, false, '❌ Test 6 Fallido: se llamó a resetPasswordForEmail con remoto pausado');
    const statusText = sb.document.getElementById('authPageStatusText').textContent;
    assert.strictEqual(statusText.includes('pausada') || statusText.includes('pausadas'), true, '❌ Test 6 Fallido: no informa de la pausa remota');
    console.log('✅ Test 6 Pasado: registro/recuperación remotos quedan pausados sin llamadas externas.');
  }

  console.log('\n✅ LAS 6 ASERCIONES DE AUTENTICACIÓN LOCAL PASADAS CON ÉXITO.');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
