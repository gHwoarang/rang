document.getElementById('year').textContent = new Date().getFullYear();
const mobileToggle = document.querySelector('.mobile-toggle');
const header = document.querySelector('.site-header');
function closeMobileMenu() {
  header.classList.remove('menu-open');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.blog-menu,.contact-menu').forEach(group => {group.classList.remove('is-open');group.querySelector('button').setAttribute('aria-expanded','false');});
}
mobileToggle.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  mobileToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.blog-menu,.contact-menu').forEach(group => {
  group.querySelector('button').addEventListener('click', () => {
    if (!matchMedia('(max-width:800px)').matches) return;
    const open = group.classList.toggle('is-open');
    group.querySelector('button').setAttribute('aria-expanded', String(open));
  });
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  if(matchMedia('(max-width:800px)').matches) closeMobileMenu();
}));
document.addEventListener('keydown', event => {if(event.key === 'Escape') closeMobileMenu();});

const sections = [...document.querySelectorAll('.lane')];
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.removeAttribute('aria-current'));
    document.querySelector(`nav a[href="#${entry.target.id}"]`)?.setAttribute('aria-current', 'page');
  });
}, { threshold: 0.45 });
sections.forEach((section) => observer.observe(section));
document.querySelectorAll('.blog-choice a').forEach(link => link.addEventListener('click', () => link.blur()));

const copy = {
  en: {
    title: 'rang — digital, media service, fintech, and products',
    description: 'rang — digital products, media services, fintech, and practical insights.',
    nav: ['products', 'digital', 'media service', 'fintech', 'blog'], contact: 'contact',
    hero: 'We turn ideas<br><span>into systems</span><br>that work.',
    intro: 'We are a small and fast team—easy to reach, open to new ideas, and always happy to talk. Whether your project is clear or still taking shape, feel free to contact us.',
    products: ['products', 'Tools built<br>to move faster.', 'Focused digital products for teams that want less friction, clearer decisions, and better workflows.', 'Currently in development'],
    digital: ['digital', 'We simplify<br>digital products.', 'From brand identity and interface design to web experiences and content systems, we create clear and powerful digital work.'],
    service: ['media service', 'We build media<br>that moves people.', 'From media strategy and creative production to technology and education, we build work designed to earn attention and create impact.'],
    fintech: ['fintech', 'We turn finance<br>into products.', 'We build fintech products that simplify financial operations, make data visible, and scale as teams grow.', 'Fintech in progress'],
    blog: ['blog', 'Ideas, systems<br>and signals.', 'Practical notes on digital products, media, infrastructure, data, AI, SEO, and the systems behind sustainable growth.'],
    blogLabels: ['Topics', 'Blog titles', 'Latest articles', ['SEO & GEO', 'Product Development', 'Media & Ad Ops', 'Infrastructure', 'Data & AI']],
    footer: 'Products / Digital / Media Service / Fintech / Blog',
    contactCard: ['Get in touch', "Let's make<br>something work.", 'Digital products, media services, and fintech inquiries.'],
    digitalItems: ['Product Development — Web, Mobile, Fintech', 'Ad Ops', 'SEO & GEO', 'Infrastructure', 'Data & AI'],
    serviceItems: ['Media Strategy & Consulting', 'Media Design & Technology', 'Media Ongoing Product Support', 'Education'],
    fintechItems: ['Financial workflow tools', 'Financial dashboards', 'Custom fintech solutions'],
    blogItems: [
      ['Building content for search engines and answer engines', [
        'Search is no longer limited to a list of blue links. People now discover information through search engines, AI assistants, social platforms, and specialized answer engines. Strong content must be useful to a person first, while also giving machines a clear structure they can understand.',
        'Start with one specific question and answer it directly. Use descriptive headings, clear definitions, real examples, and consistent terminology. A page should make its subject, audience, and purpose obvious without forcing the reader to decode marketing language. Structured data, internal links, fast loading, and accessible HTML make that useful content easier to find and interpret.',
        'SEO and GEO work best as an editorial system, not a one-time checklist. Review what people search for, update outdated claims, connect related ideas, and measure whether the content creates meaningful actions. The goal is not simply more traffic; it is to become a reliable source that people and answer engines can confidently reference.'
      ]],
      ['From idea to a scalable digital product', [
        'Most product ideas do not fail because of weak technology. They fail because the first version tries to solve too many problems for too many people. A scalable product begins with a narrow promise: one audience, one important problem, and one outcome that can be measured.',
        'Before building, map the smallest complete user journey. Remove features that do not support that journey and test the risky assumptions early. A simple prototype, a manual service, or a focused landing page can reveal more than months of development. The objective of an early release is learning, not completeness.',
        'Scale should follow evidence. Once people repeatedly receive value, strengthen the architecture, automate recurring work, and create reliable feedback loops. Good product systems keep design, engineering, data, and business decisions connected so the product can grow without losing clarity.'
      ]],
      ['Turning operational data into better decisions', [
        'Companies often collect more data than they can use. Reports multiply, dashboards become crowded, and teams still make decisions from instinct. Useful data work begins by identifying the decisions that matter, then collecting only the information needed to improve those decisions.',
        'A strong dashboard explains what changed, why it matters, and what action should follow. Metrics need clear owners, definitions, and timeframes. When the underlying process is stable, automation can remove repetitive reporting and alert teams when important conditions change.',
        'AI adds value when it supports a defined workflow: classifying requests, summarizing documents, forecasting demand, or finding patterns that people can review. It should not be added as decoration. Start with a measurable task, keep humans responsible for important outcomes, and improve the system with real operational feedback.'
      ]]
    ]
  },
  tr: {
    title: 'rang — dijital, medya hizmetleri, fintech ve ürünler',
    description: 'rang — dijital ürünler, medya hizmetleri, fintech ve uygulanabilir içgörüler.',
    nav: ['ürünler', 'dijital', 'medya hizmetleri', 'fintech', 'blog'], contact: 'iletişim',
    hero: 'Fikirleri<br><span>çalışan sistemlere</span><br>dönüştürüyoruz.',
    intro: 'Küçük ve hızlı bir ekibiz; bize kolayca ulaşabilirsiniz, yeni fikirlere açığız ve konuşmaktan memnuniyet duyarız. Projeniz ister netleşmiş ister henüz şekilleniyor olsun, çekinmeden iletişime geçebilirsiniz.',
    products: ['ürünler', 'Daha hızlı hareket<br>etmek için araçlar.', 'Daha az sürtünme, daha net kararlar ve daha iyi iş akışları isteyen ekipler için odaklı dijital ürünler.', 'Geliştirme sürecinde'],
    digital: ['dijital', 'Dijital ürünleri<br>sadeleştiriyoruz.', 'Marka kimliği ve arayüz tasarımından web deneyimleri ve içerik sistemlerine kadar net ve güçlü dijital işler üretiyoruz.'],
    service: ['medya hizmetleri', 'İnsanları harekete<br>geçiren medya.', 'Medya stratejisi ve yaratıcı üretimden teknoloji ve eğitime kadar dikkat kazanan ve etki yaratan işler üretiyoruz.'],
    fintech: ['fintech', 'Finansı<br>ürüne dönüştürüyoruz.', 'Finansal operasyonları sadeleştiren, veriyi görünür kılan ve ekiplerle birlikte ölçeklenen fintech ürünleri geliştiriyoruz.', 'Fintech geliştirme sürecinde'],
    blog: ['blog', 'Fikirler, sistemler<br>ve sinyaller.', 'Dijital ürünler, medya, altyapı, veri, yapay zekâ, SEO ve sürdürülebilir büyümenin arkasındaki sistemler üzerine pratik notlar.'],
    blogLabels: ['Konular', 'Blog başlıkları', 'Son yazılar', ['SEO & GEO', 'Ürün Geliştirme', 'Medya & Reklam Operasyonları', 'Altyapı', 'Veri & Yapay Zekâ']],
    footer: 'Ürünler / Dijital / Medya Hizmetleri / Fintech / Blog',
    contactCard: ['İletişime geç', 'Birlikte çalışan<br>bir şey yapalım.', 'Dijital ürün, medya hizmeti ve fintech talepleri.'],
    digitalItems: ['Ürün Geliştirme — Web, Mobil, Fintech', 'Reklam Operasyonları', 'SEO & GEO', 'Altyapı', 'Veri & Yapay Zekâ'],
    serviceItems: ['Medya Stratejisi & Danışmanlık', 'Medya Tasarımı & Teknoloji', 'Sürekli Medya Ürün Desteği', 'Eğitim'],
    fintechItems: ['Finansal iş akışı araçları', 'Finansal veri panelleri', 'Özel fintech çözümleri'],
    blogItems: [
      ['Arama ve cevap motorları için içerik üretmek', [
        'Arama artık yalnızca mavi bağlantılardan oluşan bir liste değildir. İnsanlar bilgiye arama motorları, yapay zekâ asistanları, sosyal platformlar ve özel cevap motorları üzerinden ulaşıyor. Güçlü içerik önce insan için yararlı olmalı, aynı zamanda makinelerin anlayabileceği açık bir yapı sunmalıdır.',
        'Tek bir soruyla başlayın ve doğrudan cevap verin. Açıklayıcı başlıklar, net tanımlar, gerçek örnekler ve tutarlı terimler kullanın. Yapılandırılmış veri, dahili bağlantılar, hızlı yükleme ve erişilebilir HTML, yararlı içeriğin bulunmasını ve yorumlanmasını kolaylaştırır.',
        'SEO ve GEO tek seferlik kontrol listeleri değil, düzenli bir yayın sistemi olarak çalışır. Aramaları inceleyin, eski bilgileri güncelleyin, ilgili fikirleri birbirine bağlayın ve içeriğin anlamlı eylemler üretip üretmediğini ölçün. Amaç yalnızca trafik değil, güvenilir bir kaynak olmaktır.'
      ]],
      ['Fikirden ölçeklenebilir dijital ürüne', [
        'Ürün fikirlerinin çoğu zayıf teknoloji yüzünden değil, ilk sürümün çok fazla kişi için çok fazla sorun çözmeye çalışması yüzünden başarısız olur. Ölçeklenebilir bir ürün; tek hedef kitle, önemli bir problem ve ölçülebilir bir sonuçla başlar.',
        'Geliştirmeden önce en küçük eksiksiz kullanıcı yolculuğunu çıkarın. Bu yolculuğu desteklemeyen özellikleri kaldırın ve riskli varsayımları erkenden test edin. Basit bir prototip ya da odaklı bir açılış sayfası, aylar süren geliştirmeden daha fazla şey öğretebilir.',
        'Ölçek kanıttan sonra gelmelidir. Kullanıcılar düzenli olarak değer elde ettiğinde mimariyi güçlendirin, tekrar eden işleri otomatikleştirin ve güvenilir geri bildirim döngüleri kurun. İyi ürün sistemleri tasarım, yazılım, veri ve iş kararlarını bağlantılı tutar.'
      ]],
      ['Operasyonel veriyi daha iyi kararlara dönüştürmek', [
        'Şirketler çoğu zaman kullanabileceklerinden daha fazla veri toplar. Raporlar çoğalır, panolar kalabalıklaşır ve ekipler yine sezgileriyle karar verir. Yararlı veri çalışması, önemli kararları belirlemek ve yalnızca bu kararları geliştirecek bilgiyi toplamakla başlar.',
        'Güçlü bir pano neyin değiştiğini, bunun neden önemli olduğunu ve hangi eylemin gerektiğini açıklar. Metriklerin net sahipleri, tanımları ve zaman aralıkları olmalıdır. Süreç istikrarlı olduğunda otomasyon tekrar eden raporlamayı ortadan kaldırabilir.',
        'Yapay zekâ; talepleri sınıflandırma, belgeleri özetleme, talebi tahmin etme veya insanların inceleyebileceği örüntüleri bulma gibi tanımlı bir iş akışını desteklediğinde değer yaratır. Ölçülebilir bir görevle başlayın ve sistemi gerçek operasyonel geri bildirimle geliştirin.'
      ]]
    ]
  }
};

function applyLanguage(lang) {
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  [...document.querySelectorAll('nav > a')].forEach((link, index) => { link.textContent = t.nav[index]; });
  document.querySelector('.contact-menu > button').textContent = t.contact;
  document.querySelector('.contact-card > span').textContent = t.contactCard[0];
  document.querySelector('.contact-card > strong').innerHTML = t.contactCard[1];
  document.querySelector('.contact-card > p').textContent = t.contactCard[2];
  document.querySelector('.hero h1').innerHTML = t.hero;
  document.querySelector('.hero-bottom p').textContent = t.intro;
  ['products', 'digital', 'service', 'fintech', 'blog'].forEach((id) => {
    const section = document.getElementById(id);
    const values = t[id];
    section.querySelector('.eyebrow').textContent = values[0];
    section.querySelector('h2').innerHTML = values[1];
    section.querySelector('.lane-copy').textContent = values[2];
    if (values[3]) section.querySelector('.status-line').lastChild.textContent = ` ${values[3]}`;
  });
  [['digital', t.digitalItems], ['service', t.serviceItems], ['fintech', t.fintechItems]].forEach(([id, items]) => {
    document.querySelectorAll(`#${id} li`).forEach((item, index) => {
      const number = item.querySelector('span').outerHTML;
      item.innerHTML = `${number} ${items[index]}`;
    });
  });
  document.querySelectorAll('#blog article').forEach((article, index) => {
    article.querySelector('h3').textContent = t.blogItems[index][0];
    article.querySelectorAll('.article-body p').forEach((paragraph, paragraphIndex) => { paragraph.textContent = t.blogItems[index][1][paragraphIndex]; });
  });
  document.querySelector('.blog-topics > p').textContent = t.blogLabels[0];
  document.querySelector('.blog-index > p').textContent = t.blogLabels[1];
  document.querySelector('.blog-section-title').textContent = t.blogLabels[2];
  const blogChoice = document.querySelector('.blog-choice');
  blogChoice.querySelector('strong').innerHTML = lang === 'tr' ? 'İki blog.<br>Biraz tavşan deliği.' : 'Two tabs.<br>One rabbit hole.';
  blogChoice.querySelector('p').textContent = lang === 'tr' ? 'İş modunda mıyız, biraz dağılıyor muyuz?' : 'Work mode or a little wandering?';
  blogChoice.querySelector('a').textContent = lang === 'tr' ? 'Rang blog — fikirler mesaide ↓' : 'Rang blog — ideas at work ↓';
  blogChoice.querySelector('a:last-child').textContent = lang === 'tr' ? 'Kurucunun blogu — mesai dışı ↗' : "Founder's blog — off the clock ↗";
  document.querySelectorAll('.blog-topics span').forEach((topic, index) => { topic.textContent = t.blogLabels[3][index]; });
  document.querySelectorAll('.blog-index > a').forEach((link, index) => { link.innerHTML = `<span>0${index + 1}</span> ${t.blogItems[index][0]} <b>↓</b>`; });
  document.querySelector('footer p:nth-child(2)').textContent = t.footer;
  document.querySelectorAll('[data-lang]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  localStorage.setItem('rang-language', lang);
}

document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
applyLanguage(localStorage.getItem('rang-language') === 'tr' ? 'tr' : 'en');
