(function(){
  const root = document.documentElement;
  const btnL = document.getElementById('themeLight');
  const btnD = document.getElementById('themeDark');
  function apply(theme){
    root.setAttribute('data-theme', theme);
    btnL.setAttribute('aria-pressed', theme === 'light');
    btnD.setAttribute('aria-pressed', theme === 'dark');
    try{ localStorage.setItem('bo-theme', theme); }catch(e){}
  }
  let saved = null;
  try{ saved = localStorage.getItem('bo-theme'); }catch(e){}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));
  btnL.addEventListener('click', ()=>apply('light'));
  btnD.addEventListener('click', ()=>apply('dark'));
})();
