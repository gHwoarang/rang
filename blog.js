const runtimeConfig = (typeof window !== 'undefined' && window.RANG_SUPABASE_CONFIG) || {};
const SUPABASE_URL = String(runtimeConfig.url || 'https://bjolpqrqapihzojlnwlt.supabase.co').trim();
const SUPABASE_ANON_KEY = String(runtimeConfig.anonKey || '').trim();


const copy = {
  tr: {
    home: 'Ana sayfa', founder: 'Kurucu blogu ↗', eyebrow: 'Rang / Blog', title: 'Fikirler,<br>sistemler<br>ve sinyaller.',
    intro: 'Dijital ürünler, medya, altyapı, veri ve yapay zekâ üzerine pratik notlar. Yazılar Supabase üzerinden yayınlanır.',
    posts: 'Yazılar', feedbackEyebrow: 'Söz sende', feedbackTitle: 'Görüşünü paylaş.',
    feedbackIntro: 'Yazılar hakkında ne düşündüğünü bize gönder. Adın ve görüşün yalnızca onaylandıktan sonra yayınlanır; e-posta adresin hiçbir zaman gösterilmez.',
    feedbackPublicTitle: 'Ziyaretçi görüşleri',
    name: 'Ad', email: 'E-posta', message: 'Görüşün', submit: 'Görüşü gönder',
    feedbackEmpty: 'Henüz yayınlanmış görüş yok.',
    loading: 'Yazılar yükleniyor…', empty: 'Henüz yayınlanmış yazı yok.', setup: 'Supabase URL ve anon key ekleyin; örn. window.RANG_SUPABASE_CONFIG = { url, anonKey }.',
    loadError: 'Yazılar şu anda yüklenemiyor.', submitting: 'Gönderiliyor…', success: 'Görüşün onay için gönderildi, teşekkürler.',
    feedbackLoadError: 'Görüşler şu anda yüklenemiyor.',
    submitError: 'Görüş gönderilemedi. Lütfen daha sonra tekrar dene.'
  },
  en: {
    home: 'Home', founder: "Founder's blog ↗", eyebrow: 'Rang / Blog', title: 'Ideas,<br>systems<br>and signals.',
    intro: 'Practical notes on digital products, media, infrastructure, data, and AI. Posts are published through Supabase.',
    posts: 'Articles', feedbackEyebrow: 'Your turn', feedbackTitle: 'Share your thoughts.',
    feedbackIntro: 'Tell us what you think about the articles. Your name and feedback will only be published after approval; your email is never shown.',
    feedbackPublicTitle: 'Visitor feedback',
    name: 'Name', email: 'Email', message: 'Your feedback', submit: 'Send feedback',
    feedbackEmpty: 'There are no published comments yet.',
    loading: 'Loading articles…', empty: 'There are no published articles yet.', setup: 'Add your Supabase URL and anon key, e.g. window.RANG_SUPABASE_CONFIG = { url, anonKey }.',
    loadError: 'Articles are unavailable right now.', submitting: 'Sending…', success: 'Your feedback was sent for approval. Thank you.',
    feedbackLoadError: 'Feedback is unavailable right now.',
    submitError: 'Your feedback could not be sent. Please try again later.'
  }
};

let language = localStorage.getItem('rang-language') === 'en' ? 'en' : 'tr';
const postList = document.getElementById('post-list');
const postsStatus = document.getElementById('posts-status');
const form = document.getElementById('feedback-form');
const formStatus = document.getElementById('form-status');
const feedbackList = document.getElementById('feedback-list');
const feedbackListStatus = document.getElementById('feedback-list-status');

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  const text = copy[language];
  document.documentElement.lang = language;
  document.title = language === 'tr' ? 'Rang Blog' : 'Rang Blog';
  document.querySelectorAll('[data-copy]').forEach((element) => {
    const value = text[element.dataset.copy];
    if (value !== undefined) {
      if (element.matches('h1')) element.innerHTML = value;
      else element.textContent = value;
    }
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
  localStorage.setItem('rang-language', language);
}

function makePost(post) {
  const article = document.createElement('article');
  article.className = 'post-card';
  const meta = document.createElement('div');
  meta.className = 'post-meta';
  const date = post.published_at ? new Date(post.published_at) : null;
  meta.textContent = [post.topic, date && !Number.isNaN(date.valueOf()) ? date.toLocaleDateString(language) : ''].filter(Boolean).join(' / ');
  const content = document.createElement('div');
  const heading = document.createElement('h3');
  heading.textContent = post.title;
  content.append(heading);
  if (post.excerpt) {
    const excerpt = document.createElement('p');
    excerpt.className = 'post-excerpt';
    excerpt.textContent = post.excerpt;
    content.append(excerpt);
  }
  const body = document.createElement('div');
  body.className = 'post-content';
  (post.content || '').split(/\r?\n\s*\r?\n/).filter(Boolean).forEach((paragraphText) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = paragraphText;
    body.append(paragraph);
  });
  content.append(body);
  article.append(meta, content);
  return article;
}

async function loadPosts(client) {
  postsStatus.textContent = copy[language].loading;
  const { data, error } = await client.from('blog_posts')
    .select('slug, title, excerpt, content, topic, published_at')
    .or('is_published.is.null,is_published.eq.true')
    .order('published_at', { ascending: false });
  if (error) {
    postsStatus.textContent = copy[language].loadError;
    return;
  }
  postsStatus.textContent = data.length ? '' : copy[language].empty;
  data.forEach((post) => postList.append(makePost(post)));
}

function makeFeedback(feedback) {
  const article = document.createElement('article');
  article.className = 'feedback-card';
  const message = document.createElement('p');
  message.textContent = feedback.feedback;
  const author = document.createElement('p');
  author.className = 'feedback-author';
  author.textContent = feedback.name;
  article.append(message, author);
  return article;
}

async function loadFeedback(client) {
  const { data, error } = await client.from('blog_feedback')
    .select('name, feedback')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error) {
    feedbackListStatus.textContent = copy[language].feedbackLoadError;
    console.error('Could not load published feedback:', error);
    return;
  }
  feedbackList.replaceChildren(...data.map(makeFeedback));
  feedbackListStatus.textContent = data.length ? '' : copy[language].feedbackEmpty;
}

async function sendFeedback(client, event) {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const values = new FormData(form);
  button.disabled = true;
  button.textContent = copy[language].submitting;
  formStatus.textContent = '';
  const { error } = await client.from('blog_feedback').insert({
    name: values.get('name').trim(),
    email: values.get('email').trim(),
    feedback: values.get('feedback').trim()
  });
  button.disabled = false;
  button.textContent = copy[language].submit;
  formStatus.textContent = error ? copy[language].submitError : copy[language].success;
  if (error) console.error('Could not submit feedback:', error);
  if (!error) form.reset();
}

document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});
applyLanguage(language);

const isConfigured = SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('YOUR_PROJECT') &&
  SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE');
if (!isConfigured || !window.supabase) {
  postsStatus.textContent = copy[language].setup;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.dataset.copy = 'setup';
  formStatus.textContent = copy[language].setup;
} else {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  loadPosts(client);
  loadFeedback(client);
  client.channel('published-blog-feedback')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_feedback' }, loadFeedback.bind(null, client))
    .subscribe((status, error) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        console.error('Live feedback updates are unavailable:', error || status);
      }
    });
  window.setInterval(() => loadFeedback(client), 15000);
  form.addEventListener('submit', (event) => sendFeedback(client, event));
}