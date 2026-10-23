/*
 * Thin reading progress bar at the very top of a post. A few lines of inline
 * JavaScript set --p from how far <article class="post"> has scrolled: 0 at
 * its top, 1 when its end reaches the bottom of the screen. The article is
 * measured once the page has loaded (and again on resize); scrolling only
 * reads scrollY, so it never forces a layout. Without JavaScript the bar
 * simply stays empty.
 */
const script = `(function(){var a=document.querySelector("article.post"),b=document.getElementById("post-progress");if(!a||!b)return;var top=0,h=0,w=false;function u(){w=false;var d=h-window.innerHeight,p=d>0?(window.scrollY-top)/d:(window.scrollY>top?1:0);b.style.setProperty("--p",String(p<0?0:p>1?1:p))}function m(){var r=a.getBoundingClientRect();top=r.top+window.scrollY;h=r.height;u()}function s(){if(!w){w=true;requestAnimationFrame(u)}}addEventListener("scroll",s,{passive:true});addEventListener("resize",m);if(document.readyState==="complete")m();else addEventListener("load",m)})();`;

export function ReadingProgress() {
  return (
    <>
      <div id="post-progress" className="post-progress" aria-hidden="true">
        <span />
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
