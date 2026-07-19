const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const appPath = path.resolve(__dirname, '../app.js');
let code = fs.readFileSync(appPath, 'utf8');
code += '\nthis.setAuthState = setAuthState;\nthis.checkAuthUser = checkAuthUser;\n';

function createMockSandbox(supabaseMock) {
  const mockElement = {
    textContent: '',
    innerHTML: '',
    style: {},
    dataset: {},
    classList: { add: () => {}, remove: () => {} },
    addEventListener: () => {},
    querySelector: () => mockElement,
    querySelectorAll: () => []
  };

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
        dataset: { authState: 'unauthenticated' }
      },
      getElementById: () => mockElement,
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
  return sandbox;
}

console.log('--- TEST DE ESTADOS DE AUTENTICACIÓN CON ASERCIONES ---');

async function runTests() {
  // Test 1: getSession() con session.user activa modo 'authenticated' y authMode = 'supabase'
  {
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: { user: { email: 'test@example.com', user_metadata: { name: 'TestUser' } } } }, error: null }),
        onAuthStateChange: () => {}
      }
    });
    await sb.checkAuthUser();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 1 Fallido: getSession con session no activo authState = authenticated');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'supabase', '❌ Test 1 Fallido: authMode debe ser supabase');
    console.log('✅ Test 1 Pasado: getSession con session.user activa authState = authenticated (supabase)');
  }

  // Test 2: Local storage sin sesion activa modo 'guest'
  {
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => {}
      }
    });
    sb.localStorage.setItem('opoA2UserName', 'Merce');
    await sb.checkAuthUser();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'authenticated', '❌ Test 2 Fallido: Local name debe ocultar authScreen (authState = authenticated)');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'guest', '❌ Test 2 Fallido: authMode debe ser guest');
    console.log('✅ Test 2 Pasado: Perfil guardado localmente activa authState = authenticated (guest)');
  }

  // Test 3: Sin sesion ni perfil local activa modo 'unauthenticated'
  {
    const sb = createMockSandbox({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => {}
      }
    });
    await sb.checkAuthUser();
    assert.strictEqual(sb.document.documentElement.dataset.authState, 'unauthenticated', '❌ Test 3 Fallido: Sin sesion ni perfil debe ser unauthenticated');
    assert.strictEqual(sb.document.documentElement.dataset.authMode, 'none', '❌ Test 3 Fallido: authMode debe ser none');
    console.log('✅ Test 3 Pasado: Sin sesión remota ni perfil guardado activa authState = unauthenticated (none)');
  }

  console.log('\n✅ TODAS LAS ASERCIONES DE AUTENTICACIÓN PASADAS CON ÉXITO.');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
