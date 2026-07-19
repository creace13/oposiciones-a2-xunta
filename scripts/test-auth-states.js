const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const appPath = path.resolve(__dirname, '../app.js');
let code = fs.readFileSync(appPath, 'utf8');
code += '\nthis.setAuthState = setAuthState;\nthis.checkAuthUser = checkAuthUser;\n';

function createMockSandbox(supabaseMock) {
  const elements = {};
  
  function getOrCreateElement(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        value: '',
        textContent: '',
        innerHTML: '',
        style: {},
        dataset: {},
        listeners: {},
        classList: { add: () => {}, remove: () => {} },
        addEventListener: function(evt, fn) { this.listeners[evt] = fn; },
        querySelector: () => mockElement,
        querySelectorAll: () => []
      };
    }
    return elements[id];
  }

  const mockElement = getOrCreateElement('mockDefault');

  const sandbox = {
    window: {
      location: { hash: '' },
      addEventListener: () => {},
      supabase: {
        createClient: () => supabaseMock
      }
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
      getItem: function(k) { return this.storage[k] || null; },
      setItem: function(k, v) { this.storage[k] = String(v); },
      removeItem: function(k) { delete this.storage[k]; }
    },
    console,
    setTimeout,
    clearTimeout
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  sandbox.supabaseClient = supabaseMock;
  sandbox.elements = elements;
  return sandbox;
}

console.log('--- SUITE DE 5 PRUEBAS DE ESTADOS DE AUTENTICACIÓN CON ASERCIONES ---');

async function runTests() {
  // Test 1: Sesión Supabase válida -> authMode = 'supabase'
  {
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: { user: { email: 'test@example.com', user_metadata: { name: 'TestUser' } } } }, error: null }),
        onAuthStateChange: () => {}
      }
    });
    await sb.checkAuthUser();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 1 Fallido: authState no es authenticated');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'supabase', '❌ Test 1 Fallido: authMode no es supabase');
    console.log('✅ Test 1 Pasado: Sesión Supabase válida activa authMode = supabase');
  }

  // Test 2: Alta con user y session nula -> NUNCA authMode = 'supabase' y muestra aviso de confirmación
  {
    let signUpCalled = false;
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signUp: async () => {
          signUpCalled = true;
          return { data: { user: { id: 'usr-123', email: 'novo@opos.gal' }, session: null }, error: null };
        },
        onAuthStateChange: () => {}
      }
    });

    const emailInput = sb.document.getElementById('authPageEmail'); emailInput.value = 'novo@opos.gal';
    const passInput = sb.document.getElementById('authPagePassword'); passInput.value = 'Secret123!';
    const nameInput = sb.document.getElementById('authPageName'); nameInput.value = 'OpositorNovo';
    const signUpBtn = sb.document.getElementById('authPageSignUpBtn');
    
    assert.strictEqual(typeof signUpBtn.listeners['click'], 'function', '❌ Handler de authPageSignUpBtn no asignado');
    await signUpBtn.listeners['click']();

    assert.strictEqual(signUpCalled, true, '❌ signUp de Supabase no fue invocado');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'none', '❌ Test 2 Fallido: Registro sin confirmación no debe activar modo remoto');
    const statusText = sb.document.getElementById('authPageStatusText').textContent;
    assert.strictEqual(statusText.includes('correo') || statusText.includes('confirmar'), true, '❌ Mensaje de confirmación de email no mostrado');
    console.log('✅ Test 2 Pasado: Alta sin sesión no declara modo supabase y muestra aviso de confirmación por email');
  }

  // Test 3: Perfil guardado localmente -> authMode = 'guest'
  {
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => {}
      }
    });
    sb.localStorage.setItem('opoA2UserName', 'Merce');
    await sb.checkAuthUser();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 3 Fallido: Perfil local debe ocultar authScreen');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'guest', '❌ Test 3 Fallido: authMode no es guest');
    console.log('✅ Test 3 Pasado: Perfil local guardado activa authMode = guest');
  }

  // Test 4: Botón de acceso invitado -> authMode = 'guest'
  {
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => {}
      }
    });
    const guestBtn = sb.document.getElementById('guestAccessBtn');
    assert.strictEqual(typeof guestBtn.listeners['click'], 'function', '❌ Handler de guestAccessBtn no asignado');
    guestBtn.listeners['click']();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 4 Fallido: Botón invitado debe dar acceso');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'guest', '❌ Test 4 Fallido: authMode no es guest');
    console.log('✅ Test 4 Pasado: Acceso por botón invitado activa authMode = guest');
  }

  // Test 5: Credenciales inválidas en signInWithPassword -> NO dispara automáticamente signUp()
  {
    let autoSignUpDispatched = false;
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: { message: 'Invalid login credentials', status: 400 } }),
        signUp: async () => { autoSignUpDispatched = true; return { data: null, error: null }; },
        onAuthStateChange: () => {}
      }
    });

    const emailInput = sb.document.getElementById('authPageEmail'); emailInput.value = 'invalid@test.com';
    const passInput = sb.document.getElementById('authPagePassword'); passInput.value = 'wrongpass';
    const form = sb.document.getElementById('authPageForm');

    assert.strictEqual(typeof form.listeners['submit'], 'function', '❌ Handler de submit de authPageForm no asignado');
    await form.listeners['submit']({ preventDefault: () => {} });

    assert.strictEqual(autoSignUpDispatched, false, '❌ Test 5 Fallido: Fallo en login disparó signUp involuntario');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'none', '❌ Test 5 Fallido: authMode alterado tras login fallido');
    const statusText = sb.document.getElementById('authPageStatusText').textContent;
    assert.strictEqual(statusText.includes('Error'), true, '❌ Error de credenciales no mostrado al usuario');
    console.log('✅ Test 5 Pasado: Credenciales inválidas devuelven error de login sin llamar a signUp()');
  }

  console.log('\n✅ LAS 5 ASERCIONES DE AUTENTICACIÓN PASADAS CON ÉXITO.');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
