export function enrichHtml(html: string): string {
  let result = html;

  result = fixJsxAttributes(result);
  result = enrichExternalLinks(result);
  result = enrichImages(result);
  result = enrichYouTubeIframes(result);
  result = enrichCodePenEmbeds(result);

  return result;
}

function fixJsxAttributes(html: string): string {
  return html
    .replace(/className=/g, "class=")
    .replace(/frameBorder=/g, "frameborder=")
    .replace(/allowFullScreen/g, "allowfullscreen");
}

function enrichExternalLinks(html: string): string {
  return html.replace(
    /<a\s([^>]*href="https?:\/\/(?!(?:[^"]*davebitter\.com))[^"]*"[^>]*)>/gi,
    (match, attrs: string) => {
      if (!attrs.includes('target=')) {
        attrs += ' target="_blank"';
      }
      if (!attrs.includes('rel=')) {
        attrs += ' rel="noopener noreferrer"';
      }
      return `<a ${attrs}>`;
    }
  );
}

function enrichImages(html: string): string {
  let result = html.replace(
    /<img(?![^>]*loading=)([^>]*?)>/gi,
    '<img loading="lazy"$1>'
  );

  result = result.replace(
    /<p>(<img[^>]*>)<\/p>/gi,
    "<figure>$1</figure>"
  );

  result = result.replace(
    /(<li[^>]*>(?:(?!<\/li>)[\s\S])*?)(<img[^>]*>)/gi,
    (match, before: string, img: string) => {
      const styledImg = img.replace(
        /style="[^"]*"/i,
        ""
      );
      return `${before}${styledImg.replace("<img", '<img style="display:block;max-width:100%;height:auto;margin:0.75em 0;border-radius:0.5rem"')}`;
    }
  );

  return result;
}

function enrichYouTubeIframes(html: string): string {
  return html.replace(
    /<iframe([^>]*src="[^"]*youtube\.com\/embed[^"]*"[^>]*)><\/iframe>/gi,
    '<div style="position:relative;aspect-ratio:16/9;width:100%"><iframe style="position:absolute;inset:0;width:100%;height:100%"$1></iframe></div>'
  );
}

function enrichCodePenEmbeds(html: string): string {
  let result = html;

  result = result.replace(
    /<p\s+class="codepen"[^>]*data-slug-hash="([^"]*)"[^>]*data-user="([^"]*)"[^>]*>[\s\S]*?<\/p>\s*(?:<script[^>]*cpwebassets\.codepen\.io[^>]*><\/script>\s*)*/gi,
    '<iframe src="https://codepen.io/$2/embed/$1?default-tab=result&theme-id=dark" style="width:100%;height:400px;border:0;border-radius:0.75rem;overflow:hidden;margin:1.75em 0" loading="lazy" allowfullscreen></iframe>'
  );

  result = result.replace(
    /<iframe([^>]*src="[^"]*codepen\.io[^"]*"[^>]*)><\/iframe>/gi,
    (match, attrs: string) => {
      const cleaned = attrs
        .replace(/style="[^"]*"/gi, "")
        .replace(/class="[^"]*"/gi, "");
      return `<iframe${cleaned} style="width:100%;height:400px;border:0;border-radius:0.75rem;overflow:hidden;margin:1.75em 0" loading="lazy"></iframe>`;
    }
  );

  return result;
}
