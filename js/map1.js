const STOPS = [
 {
  "c": [
   59.9404,
   30.3139
  ],
  "t": "Зимний дворец / Дворцовая площадь",
  "d": "Тут всё началось - отсюда Александр II начал свой роковой путь 1 марта 1881 года."
 },
 {
  "c": [
   59.9398,
   30.3188
  ],
  "t": "Место покушения Александра Соловьёва",
  "d": "2 апреля 1879 года здесь, у здания штаба Гвардейского корпуса, на императора совершил покушение террорист-одиночка Александр Соловьёв. Царь чудом уцелел, убегая зигзагами от пуль."
 },
 {
  "c": [
   59.9304,
   30.3191
  ],
  "t": "План взрыва Каменного моста",
  "d": "Летом 1880 года народовольцы заложили мину под мост, но Александр II уехал в Крым. Динамитные заряды, обнаруженные позже, остались нетронутыми."
 },
 {
  "c": [
   59.9342,
   30.3382
  ],
  "t": "Сырная лавка на Малой Садовой",
  "d": "Здесь народовольцы арендовали помещение под сырную лавку и прорыли подкоп, заложив мину. Позже на этом месте построили Елисеевский магазин."
 },
 {
  "c": [
   59.9342,
   30.3352
  ],
  "t": "Невский проспект",
  "d": "По первоначальному плану царь должен был проехать по Невскому. Софья Перовская даже нарисовала схему маршрута на конверте."
 },
 {
  "c": [
   59.9401,
   30.3194
  ],
  "t": "Певческий мост",
  "d": "Вопреки ожиданиям заговорщиков, Александр II приказал ехать через Певческий мост, изменив привычный маршрут."
 },
 {
  "c": [
   59.9416,
   30.3289
  ],
  "t": "Театральный мост",
  "d": "Изменение маршрута означало, что карета проследует к Театральному мосту через Екатерининский канал."
 },
 {
  "c": [
   59.9371,
   30.3273
  ],
  "t": "Поворот на Большую Итальянскую улицу",
  "d": "Карета императора повернула на Большую Итальянскую, минуя Невский проспект."
 },
 {
  "c": [
   59.9359,
   30.3408
  ],
  "t": "Михайловский манеж",
  "d": "После смотра в манеже Александр II отправился к сестре. Услышав крик \"Поехал на канал!\", заговорщики покинули сырную лавку."
 },
 {
  "c": [
   59.9371,
   30.3315
  ],
  "t": "Обратный путь. Михайловский сквер",
  "d": "В хорошем настроении после визита к сестре, император отправился обратно тем же маршрутом вдоль канала."
 },
 {
  "c": [
   59.9385,
   30.3323
  ],
  "t": "Михайловский дворец",
  "d": "Ныне Русский музей. В 1881 году здесь жила сестра царя Екатерина Михайловна, известная благотворительностью."
 },
 {
  "c": [
   59.9367,
   30.3314
  ],
  "t": "Перегруппировка",
  "d": "Перовская, увидев изменение маршрута, подала сигнал платком - бомбометателям следовать к каналу."
 },
 {
  "c": [
   59.9383,
   30.3279
  ],
  "t": "Обратный путь по набережной",
  "d": "Карета с императором проследовала обратно по набережной Екатерининского канала, где её ждали народовольцы."
 },
 {
  "c": [
   59.9401,
   30.3283
  ],
  "t": "Место убийства",
  "d": "Здесь в 14:15 Рысаков бросил первую бомбу, а Гриневицкий - вторую, смертельно ранив императора."
 },
 {
  "c": [
   59.9401,
   30.3142
  ],
  "t": "Возвращение в Зимний дворец",
  "d": "Смертельно раненого Александра II повезли во дворец, где он скончался в 15:35. Гриневицкий умер вечером того же дня."
 }
];

const ACTIVE = '#ecd48f', IDLE = '#8a7440';
const $ = s => document.querySelector(s);
const slider = $('#slider');
const items = [...document.querySelectorAll('.stops button')];
let current = 0, map = null, marks = [], timer = null;

function select(i, pan = true) {
    current = i;
    slider.value = i;
    items.forEach((b, k) => {
        b.classList.toggle('on', k === i);
        b.setAttribute('aria-current', k === i ? 'step' : 'false');
    });
    items[i].scrollIntoView({ block: 'nearest' });
    $('#nowTitle').textContent = (i + 1) + '. ' + STOPS[i].t;
    $('#nowText').textContent = STOPS[i].d;
    $('#count').textContent = (i + 1) + ' из ' + STOPS.length;
    $('#more').dataset.modal = 'modal-info-' + (i + 1);
    marks.forEach((m, k) => m.options.set('iconColor', k === i ? ACTIVE : IDLE));
    if (pan && map) map.panTo(STOPS[i].c, { flying: true });
}

function initMap() {
    try {
        map = new ymaps.Map('map', { center: STOPS[0].c, zoom: 14, controls: ['zoomControl', 'fullscreenControl'] });
        STOPS.forEach((st, i) => {
            const m = new ymaps.Placemark(st.c, { hintContent: (i + 1) + '. ' + st.t }, { preset: 'islands#circleIcon' });
            m.events.add('click', () => select(i));
            map.geoObjects.add(m);
            marks.push(m);
        });
        $('#mapNote').hidden = true;
        select(current, false);
    } catch (e) { console.warn('Карта не загрузилась:', e); }
}
if (window.ymaps) ymaps.ready(initMap);

items.forEach((b, i) => b.addEventListener('click', () => select(i)));
slider.addEventListener('input', () => select(+slider.value));
$('#prev').addEventListener('click', () => select(Math.max(0, current - 1)));
$('#next').addEventListener('click', () => select(Math.min(STOPS.length - 1, current + 1)));
$('#play').addEventListener('click', function () {
    if (timer) { clearInterval(timer); timer = null; this.textContent = 'Автопрокрутка'; return; }
    this.textContent = 'Остановить';
    timer = setInterval(() => select((current + 1) % STOPS.length), 4000);
});

document.addEventListener('click', e => {
    const b = e.target.closest('[data-modal]');
    if (b) { document.getElementById(b.dataset.modal)?.showModal(); return; }
    if (e.target.matches('dialog')) e.target.close();
});

select(0, false);
