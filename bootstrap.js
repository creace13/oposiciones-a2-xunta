(() => {
  const validViews = ['dashboard', 'practice', 'simulations', 'errors', 'library', 'syllabus', 'methodology'];
  const hashViews = { inicio: 'dashboard', practicar: 'practice', simulacros: 'simulations', errores: 'errors', biblioteca: 'library', temario: 'syllabus', syllabus: 'syllabus', metodologia: 'methodology', guia: 'methodology' };
  const hash = decodeURIComponent(location.hash.replace('#', '')).trim();
  let stored = null;
  let authUser = null;
  try {
    stored = localStorage.getItem('opoA2LastView');
    authUser = localStorage.getItem('opoA2UserName');
  } catch (_) {}
  const view = hashViews[hash] || (validViews.includes(hash) ? hash : null) || stored || 'dashboard';
  document.documentElement.dataset.activeView = validViews.includes(view) ? view : 'dashboard';
  const isAuth = Boolean(authUser && authUser !== 'Invitado');
  document.documentElement.dataset.authState = isAuth ? 'authenticated' : 'unauthenticated';
})();
