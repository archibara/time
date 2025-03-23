const elementIds = ['title', 'date', 'iframe', 'copy'];

const elements = Object.fromEntries(
  elementIds.map(id => [id, document.getElementById(id)])
);

const iframeInitialSrc = elements.iframe.src;
const msInMinute = 60 * 1000;
const tzOffsetInMs = new Date().getTimezoneOffset() * msInMinute;
elements.date.value = new Date(Date.now() - tzOffsetInMs - msInMinute).toISOString().substring(0, 16);
elements.title.value = 'Countdown';

const updateIframe = () => {
  const title = elements.title.value || 'Countdown';
  const date = elements.date.value || new Date();
  elements.iframe.src = `${iframeInitialSrc}?title=${title}&t=${date}`;
};

updateIframe();
elements.title.addEventListener('input', updateIframe);
elements.date.addEventListener('input', updateIframe);

elements.copy.addEventListener('click', () => {
  navigator.clipboard.writeText(elements.iframe.src).catch(console.error);
});