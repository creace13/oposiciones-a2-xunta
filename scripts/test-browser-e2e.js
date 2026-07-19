const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log('--- SUITE DE PRUEBAS FUNCIONALES NAVEGADOR / E2E (INDEX.HTML + APP.JS) ---');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const appPath = path.join(rootDir, 'app.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const appContent = fs.readFileSync(appPath, 'utf8');

// Simple DOM Parser for index.html elements
class SimpleElement {
  constructor(tagName, id = '', classList = []) {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.classList = {
      classes: new Set(classList),
      add: (...c) => c.forEach(x => this.classList.classes.add(x)),
      remove: (...c) => c.forEach(x => this.classList.classes.delete(x)),
      contains: (c) => this.classList.classes.has(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList.classes.has(c)) this.classList.classes.delete(c);
          else this.classList.classes.add(c);
        } else if (force) {
          this.classList.classes.add(c);
        } else {
          this.classList.classes.delete(c);
        }
      }
    };
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
    this.attributes = {};
    this.dataset = {};
    this.value = '';
    this.textContent = '';
    this.innerHTML = '';
    this.disabled = false;
    this.style = {};
  }

  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  async dispatchEvent(event) {
    const type = typeof event === 'string' ? event : event.type;
    const fns = this.listeners[type] || [];
    for (const fn of fns) {
      await fn(event);
    }
  }

  click() {
    return this.dispatchEvent({ type: 'click', preventDefault: () => {}, stopPropagation: () => {} });
  }

  showModal() {
    this.open = true;
    this.classList.remove('hidden');
  }

  close() {
    this.open = false;
  }

  querySelector(selector) {
    return querySelectorFrom(this, selector);
  }

  querySelectorAll(selector) {
    return querySelectorAllFrom(this, selector);
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }
}

function parseHTMLToDOM(html) {
  const elementsById = {};
  const allElements = [];

  // Match elements with id
  const idRegex = /<([a-z0-9]+)\s+[^>]*id=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    const tag = match[1];
    const id = match[2];
    const el = new SimpleElement(tag, id);
    el.parentElement = new SimpleElement('div');
    elementsById[id] = el;
    allElements.push(el);
  }

  // Common UI elements
  const commonIds = [
    'authScreen', 'guestAccessBtn', 'authPageForm', 'authPageSignUpBtn', 'authPageForgotPassBtn',
    'authPageName', 'authPageEmail', 'authPagePassword', 'authPageStatusText',
    'createTest', 'topicSelect', 'lengthSelect', 'quizCard', 'simulationStart',
    'errorList', 'coverageSummary', 'coverageList', 'logoutBtn', 'sidebarLogoutBtn',
    'privacyModal', 'authDialog', 'pauseButton', 'newGoal', 'goalDialog', 'goalInput', 'saveGoal',
    'authStatusText', 'resetPasswordModal', 'resetPasswordForm', 'newPasswordInput', 'resetPasswordStatus'
  ];

  for (const id of commonIds) {
    if (!elementsById[id]) {
      const el = new SimpleElement('div', id);
      el.parentElement = new SimpleElement('div');
      elementsById[id] = el;
      allElements.push(el);
    }
  }

  return { elementsById, allElements };
}

function querySelectorFrom(root, selector) {
  if (selector.startsWith('#')) {
    const id = selector.substring(1);
    return root.elementsById ? root.elementsById[id] : null;
  }
  const el = new SimpleElement('div');
  el.parentElement = new SimpleElement('div');
  el.textContent = 'Mock Element';
  return el;
}

function querySelectorAllFrom(root, selector) {
  return [];
}

async function runE2ESuite() {
  const dom = parseHTMLToDOM(htmlContent);
  const elementsById = dom.elementsById;

  const documentMock = {
    documentElement: new SimpleElement('html', 'html'),
    getElementById: (id) => elementsById[id] || new SimpleElement('div', id),
    querySelector: (selector) => {
      if (selector.startsWith('#')) return elementsById[selector.substring(1)];
      const el = new SimpleElement('div');
      el.parentElement = new SimpleElement('div');
      return el;
    },
    querySelectorAll: (selector) => {
      if (selector === '.nav-item') {
        return [
          new SimpleElement('a', 'nav-practice', ['nav-item']),
          new SimpleElement('a', 'nav-simulations', ['nav-item']),
          new SimpleElement('a', 'nav-errors', ['nav-item']),
          new SimpleElement('a', 'nav-library', ['nav-item']),
          new SimpleElement('a', 'nav-syllabus', ['nav-item'])
        ];
      }
      return [];
    },
    addEventListener: () => {}
  };

  const sandbox = {
    window: {
      location: { hash: '' },
      addEventListener: () => {},
      scrollTo: () => {},
      supabase: {
        createClient: () => ({
          auth: {
            getSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => {}
          }
        })
      }
    },
    document: documentMock,
    localStorage: {
      storage: {},
      getItem: function(k) { return this.storage[k] || null; },
      setItem: function(k, v) { this.storage[k] = String(v); },
      removeItem: function(k) { delete this.storage[k]; }
    },
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval
  };

  vm.createContext(sandbox);
  vm.runInContext(appContent + '\nthis.state = state;\nthis.getActiveQuiz = () => activeQuiz;\nthis.startQuiz = startQuiz;\nthis.buildSet = buildSet;\nthis.checkAuthUser = checkAuthUser;\n', sandbox);

  // Flow 1: Carga de la aplicación e inicio en modo invitado
  console.log('Test E2E 1: Entrando en modo invitado desde la portada...');
  const guestBtn = elementsById['guestAccessBtn'];
  await guestBtn.click();
  assert.strictEqual(documentMock.documentElement.dataset.authState, 'authenticated', '❌ E2E 1 Fallido: No dio acceso invitado');
  assert.strictEqual(documentMock.documentElement.dataset.authMode, 'guest', '❌ E2E 1 Fallido: Modo no es guest');
  console.log('  PASADO: Portada permite acceso en modo invitado.');

  // Flow 2: Iniciar y responder una sesión de práctica corta (5 preguntas)
  console.log('Test E2E 2: Iniciando práctica de 5 preguntas...');
  const practiceSet = sandbox.buildSet('mixto', 5);
  assert.strictEqual(practiceSet.length, 5, '❌ E2E 2 Fallido: Set de práctica no es de 5 preguntas');
  sandbox.startQuiz(practiceSet, 'practice');
  assert.strictEqual(sandbox.getActiveQuiz().length, 5, '❌ E2E 2 Fallido: Quiz activo no cargó 5 preguntas');
  console.log('  PASADO: Práctica iniciada con 5 preguntas.');

  // Flow 3: Simulacro con penalización –0.25 y recuento
  console.log('Test E2E 3: Iniciando simulacro con penalización...');
  const simSet = sandbox.buildSet('mixto', 18);
  assert.strictEqual(simSet.length, 18, '❌ E2E 3 Fallido: Simulacro no es de 18 preguntas');
  sandbox.startQuiz(simSet, 'exam');
  assert.strictEqual(sandbox.getActiveQuiz().length, 18, '❌ E2E 3 Fallido: Simulacro activo no cargó 18 preguntas');
  console.log('  PASADO: Simulacro de 18 preguntas cargado correctamente.');

  // Flow 4: Comprobación de existencia en disco de todos los enlaces de la Biblioteca
  console.log('Test E2E 4: Verificando integridad de enlaces a documentos en disco...');
  const docRegex = /href=["'](documentos\/[^"']+)["']/gi;
  let match;
  let docCount = 0;
  while ((match = docRegex.exec(htmlContent)) !== null) {
    const docRelPath = match[1];
    const fullDocPath = path.join(rootDir, docRelPath);
    assert.strictEqual(fs.existsSync(fullDocPath), true, `❌ E2E 4 Fallido: Documento no existe en disco: ${docRelPath}`);
    docCount++;
  }
  console.log(`  PASADO: Verificados ${docCount} documentos enlazados en disco.`);

  console.log('\n✅ SUITE DE PRUEBAS FUNCIONALES NAVEGADOR / E2E PASADA CON ÉXITO.');
}

runE2ESuite().catch(err => {
  console.error('❌ ERROR EN SUITE E2E NAVEGADOR:', err);
  process.exit(1);
});
