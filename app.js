const slides = [2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22].map(i=>`assets/slides/page-${String(i).padStart(2,'0')}.jpg`);

const modules = [
  {id:'presentation',title:'Презентация партии',desc:'20 слайдов: история, программа, структура и возможности.',time:'7–10 минут',icon:'▶',accent:'#43d1c4'},
  {id:'links',title:'Ссылки',desc:'Официальные сайты, социальные сети партии, проектов и ключевых представителей.',time:'5 минут',icon:'↗',accent:'#ffd166'},
  {id:'projects',title:'Проекты',desc:'Флагманские инициативы партии: задачи, достижения и официальные площадки.',time:'8 минут',icon:'◆',accent:'#43d1c4'},
  {id:'deg',title:'Что такое ДЭГ',desc:'Как работает дистанционное электронное голосование и что важно не перепутать.',time:'3 минуты',icon:'✓',accent:'#ff5165'},
  {id:'demin',title:'Александр Дёмин',desc:'Краткая биография, роль в Госдуме и основные темы работы.',time:'3 минуты',icon:'Д',accent:'#f07e23'},
  {id:'rant',title:'Рант Краев',desc:'Роль в Заксобрании, региональные инициативы и общественные проекты.',time:'4 минуты',icon:'Р',accent:'#ffd166'},
  {id:'region',title:'Свердловское отделение',desc:'Команда, уровни представительства и региональный контекст.',time:'4 минуты',icon:'66',accent:'#8bd450'},
  {id:'party',title:'Главное о партии',desc:'Факты и позиции, которые должен уверенно знать представитель команды.',time:'5 минут',icon:'#',accent:'#c997ff'}
];

const sourceLinks = `<div class="sources">
<b>Источники:</b> <a href="https://p.newpeople.ru/" target="_blank" rel="noreferrer">официальный сайт партии</a> · <a href="https://duma.gov.ru/duma/factions/72100035/" target="_blank" rel="noreferrer">фракция в Госдуме</a> · <a href="https://ekb.newpeople.ru/" target="_blank" rel="noreferrer">региональное отделение</a>
</div>`;

const galleries = {
  captains: [['assets/gallery/captains-01.jpg','Участники бизнес-интенсива «Кампус»'],['assets/gallery/captains-02.jpg','Практический модуль: ведение переговоров'],['assets/gallery/captains-03.jpg','Образовательные возможности и стажировки выпускников'],['assets/gallery/captains-04.jpg','Командная работа и мероприятия сообщества']],
  demin: [['assets/gallery/demin-01.jpg?v=demin2','Александр Дёмин'],['assets/gallery/demin-02.jpg','Александр Дёмин на рабочей встрече в Госдуме'],['assets/gallery/demin-03.jpg','Первое заседание Государственной Думы VIII созыва'],['assets/gallery/demin-04.jpg','Здание Государственной Думы в Москве']],
  rant: [['assets/gallery/rant-01.jpg','Рант Краев на встрече предпринимателей и представителей власти'],['assets/gallery/rant-02.jpg','Общественная акция Ранта Краева в Екатеринбурге'],['assets/gallery/rant-03.jpg','Рант Краев на мероприятии программы «Я в деле»'],['assets/gallery/rant-04.jpg','Рант Краев на региональном съезде «Новых людей»']],
  region: [['assets/gallery/region-01.jpg','Региональный съезд «Новых людей» в Екатеринбурге, июль 2026'],['assets/gallery/region-03.jpg','Проект поддержки уличных музыкантов в Екатеринбурге'],['assets/gallery/region-04.jpg','Рант Краев на празднике детства и творчества']],
  party: [['assets/gallery/party-01.jpg','Фракция «Новые люди» в Государственной Думе'],['assets/gallery/party-02.jpg','Партийная агитационная кампания'],['assets/gallery/party-03.png','Флаг партии «Новые люди»'],['assets/gallery/party-04.png','Логотип партии «Новые люди»']]
};

function contentPhoto([src,caption],index,wide=false){return `<figure class="content-photo ${src.endsWith('.png')?'is-logo':''} ${wide?'wide':''}">
<a href="${src}" target="_blank" rel="noreferrer">
<img src="${src}" alt="${caption}" loading="lazy">
</a>
<figcaption>
<b>${String(index+1).padStart(2,'0')}</b>
<span>${caption}</span>
</figcaption>
</figure>`}
function embedCaptainsEntry(){const roadmap=content.querySelector('.roadmap');if(!roadmap)return;roadmap.insertAdjacentHTML('afterend',`<section class="captains-entry">
<div>
<span>ПРОЕКТ АЛЕКСАНДРА ДЁМИНА</span>
<h2>Факультет бизнеса «Капитаны»</h2>
<p>Отдельный подробный раздел: как устроено обучение, кто развивал проект, какие навыки получают студенты и чего уже добилось сообщество.</p>
</div>
<button type="button" data-module="captains">Открыть раздел →</button>
</section>`)}
function embedPhotos(id){const items=galleries[id];if(!items)return;const header=content.querySelector('.lesson-title');if(header)header.insertAdjacentHTML('afterend',contentPhoto(items[0],0,true));const cards=[...content.querySelectorAll('.content-grid > .info-card')];items.slice(1).forEach((item,i)=>{const target=cards[Math.min(i,cards.length-1)];if(target)target.insertAdjacentHTML('afterend',contentPhoto(item,i+1,i===2))})}
function embedDeminRoadmap(){const facts=content.querySelector('.fact-strip');if(!facts)return;facts.insertAdjacentHTML('afterend',`<section class="roadmap" aria-labelledby="demin-roadmap-title">
<div class="roadmap-head">
<span>КЛЮЧЕВЫЕ ТОЧКИ</span>
<h2 id="demin-roadmap-title">Путь Александра Дёмина</h2>
<p>От работы с детьми и образовательных проектов — к созданию федеральной партийной сети, Государственной Думе и Свердловской области.</p>
</div>
<div class="roadmap-stats">
<div>
<b>10</b>
<span>регионов программы «Капитаны»</span>
</div>
<div>
<b>600+</b>
<span>партийных штабов в 2020–2021 годах</span>
</div>
<div>
<b>75</b>
<span>регионов охватила сеть штабов</span>
</div>
<div>
<b>60 883</b>
<span>голоса на выборах губернатора — 6,47%</span>
</div>
</div>
<div class="life-path">
<article>
<b>1988</b>
<h3>Ростов-на-Дону</h3>
<p>Родился 23 сентября 1988 года.</p>
</article>
<article>
<b>2006</b>
<h3>Начало работы с детьми</h3>
<p>С 18 лет занимался вожатской и педагогической деятельностью в детских учреждениях Ростовской и Воронежской областей и Краснодарского края.</p>
</article>
<article>
<b>2009</b>
<h3>Первое высшее образование</h3>
<p>Окончил факультет психологии Современной гуманитарной академии.</p>
</article>
<article>
<b>2009–2010</b>
<h3>Военная служба</h3>
<p>Прошёл срочную службу в Космических войсках Вооружённых сил России.</p>
</article>
<article>
<b>2012</b>
<h3>«Орлёнок»</h3>
<p>Продолжил работу с молодёжью в детском центре «Орлёнок».</p>
</article>
<article>
<b>2015</b>
<h3>Южный федеральный университет</h3>
<p>Получил образование по направлению организации и возрастной психологии.</p>
</article>
<article>
<b>2018</b>
<h3>«Капитаны»</h3>
<p>Развивал образовательную программу для молодых предпринимателей — она была открыта в 10 регионах России.</p>
</article>
<article>
<b>2018–2019</b>
<h3>«Мой первый бизнес»</h3>
<p>Руководил образовательным конкурсом для школьников в АНО «Россия — страна возможностей».</p>
</article>
<article>
<b>2020</b>
<h3>Исполком партии</h3>
<p>Стал заместителем руководителя исполнительного комитета партии «Новые люди».</p>
</article>
<article>
<b>2020–2021</b>
<h3>Федеральная сеть</h3>
<p>Участвовал в открытии более 600 избирательных штабов партии в 75 регионах России.</p>
</article>
<article>
<b>12.10.2021</b>
<h3>Государственная Дума</h3>
<p>Избран депутатом VIII созыва, стал заместителем руководителя фракции и председателем Комитета по малому и среднему предпринимательству.</p>
</article>
<article>
<b>2022</b>
<h3>Выборы губернатора</h3>
<p>Представлял «Новых людей» на выборах губернатора Свердловской области: 60 883 голоса, 6,47%, четвёртое место.</p>
</article>
<article>
<b>2023–2026</b>
<h3>Предпринимательская повестка</h3>
<p>Продолжил работу над вопросами финансирования МСП, самозанятости, снижения административной нагрузки и защиты предпринимателей.</p>
</article>
<article>
<b>2026</b>
<h3>Новый свердловский этап</h3>
<p>Возглавил общеобластную часть списка партии на выборах в Законодательное Собрание и выдвинут от региона в федеральной кампании.</p>
</article>
</div>
<div class="roadmap-note">
<b>Как запомнить путь:</b> образование → молодёжные проекты → 600+ штабов → Госдума и комитет МСП → Свердловская область.</div>
</section>`)}

document.body.insertAdjacentHTML('beforeend',`<div class="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" hidden>
<button class="lightbox-close" type="button" aria-label="Закрыть">×</button>
<button class="lightbox-arrow lightbox-prev" type="button" aria-label="Предыдущее фото">←</button>
<figure>
<img class="lightbox-image" src="" alt="">
<figcaption>
<span class="lightbox-count">
</span>
<b class="lightbox-caption">
</b>
</figcaption>
</figure>
<button class="lightbox-arrow lightbox-next" type="button" aria-label="Следующее фото">→</button>
</div>`);
const lightbox=document.querySelector('.lightbox'),lightboxImage=lightbox.querySelector('.lightbox-image'),lightboxCaption=lightbox.querySelector('.lightbox-caption'),lightboxCount=lightbox.querySelector('.lightbox-count');
let activeGallery=[],activePhoto=0;
function setLightboxPhoto(index){if(!activeGallery.length)return;activePhoto=(index+activeGallery.length)%activeGallery.length;const [src,caption]=activeGallery[activePhoto];lightboxImage.src=src;lightboxImage.alt=caption;lightboxCaption.textContent=caption;lightboxCount.textContent=`${activePhoto+1} / ${activeGallery.length}`}
function openLightbox(id,index){activeGallery=galleries[id]||[];setLightboxPhoto(index);lightbox.hidden=false;document.body.classList.add('lightbox-open');lightbox.querySelector('.lightbox-close').focus()}
function closeLightbox(){lightbox.hidden=true;document.body.classList.remove('lightbox-open');lightboxImage.src=''}
lightbox.querySelector('.lightbox-close').onclick=closeLightbox;
lightbox.querySelector('.lightbox-prev').onclick=()=>setLightboxPhoto(activePhoto-1);
lightbox.querySelector('.lightbox-next').onclick=()=>setLightboxPhoto(activePhoto+1);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')setLightboxPhoto(activePhoto-1);if(e.key==='ArrowRight')setLightboxPhoto(activePhoto+1)});

const partyProjects = [
  {slug:'yavdele',name:'Я в деле',mark:'Я',tag:'ФЛАГМАН · ПРЕДПРИНИМАТЕЛЬСТВО',lead:'Бесплатная программа развития молодёжного предпринимательства: обучение, наставники, работа над собственным проектом и защита перед экспертами.',achievement:'Работает в 72 регионах России; программа запущена партией в 2022 году и продолжает сезонные наборы.',detail:'Участники проходят путь от идеи и проверки спроса до финансовой модели и презентации проекта. Главный результат — не только знания, но и готовый проект, команда и контакты предпринимательского сообщества.',links:[['Сайт','https://явделе.рф/'],['ВКонтакте','https://vk.com/yavde1e'],['Telegram','https://t.me/yavde1e'],['Страница партии','https://newpeople.ru/projects/ya-v-dele']]},
  {slug:'ecosfera',name:'Экосфера',mark:'ЭКО',tag:'ФЛАГМАН · ЭКОЛОГИЯ И БЛАГОТВОРИТЕЛЬНОСТЬ',lead:'Федеральное экологическое направление партии и благотворительного фонда: восстановление лесов, помощь приютам, экологическое просвещение и поддержка местных инициатив.',achievement:'Акция «Дари тепло» проходила в 30 регионах; в 2026 году заявлена программа высадки 100 гектаров леса.',detail:'Проект соединяет понятные волонтёрские действия с системной экологической повесткой. Среди форматов — посадка деревьев, помощь бездомным животным, свопы, фестивали и конкурс молодёжных инициатив «ЧистоНаше».',links:[['Сайт фонда','https://сфераэко.рф/'],['ВКонтакте','https://vk.com/eco_sphera'],['Telegram','https://t.me/eco_sphera'],['Новости партии','https://t.me/partynewpeople']]},
  {slug:'voice',name:'Голос города',mark:'♪',tag:'ФЛАГМАН · ГОРОДСКАЯ КУЛЬТУРА',lead:'Проект поддержки уличных музыкантов и новых городских сцен: легальные площадки, открытые концерты, конкурсы и знакомство артистов с аудиторией.',achievement:'Новый сезон 2026 года открыт в 35 регионах России.',detail:'«Голос города» помогает артистам выйти из случайного уличного формата в организованную культурную программу. Для города это новые точки притяжения, а для музыкантов — аудитория, сцена и возможность заявить о себе.',links:[['Telegram партии','https://t.me/s/partynewpeople?q=%23голосгорода'],['ВКонтакте','https://vk.com/mycityvoice_krd'],['Итоги сезона','https://iz.ru/2111291/2026-06-06/partiia-novye-liudi-masshtabirovala-proekt-golos-goroda']]},
  {slug:'masters',name:'Мастера будущего',mark:'МБ',tag:'ФЛАГМАН · ИГРОПРАКТИКА',lead:'Клуб деловых и стратегических игр, в которых участники тренируют управление, переговоры, аналитику и принятие решений.',achievement:'Игры «Геополитика» проводились в разных регионах и вузах; отдельные региональные сессии собирали более 120 участников.',detail:'Участники получают роли государств, команд и управленцев, работают с ограниченными ресурсами и последствиями решений. Формат позволяет безопасно отрабатывать стратегическое мышление и командное взаимодействие.',links:[['ВКонтакте','https://vk.com/mb.game'],['Страница проекта','https://фондкапитаны.рф/page43919449.html'],['Telegram партии','https://t.me/partynewpeople']]},
  {slug:'communities',name:'Городские сообщества',mark:'ГОРОД',tag:'ФЛАГМАН · МЕСТНЫЕ ИНИЦИАТИВЫ',lead:'Площадка для активных жителей, соседских объединений, урбанистов и лидеров локальных инициатив.',achievement:'В разных городах проходят встречи сообществ, конкурсы инициатив и премии для лидеров, чьи проекты меняют городскую среду.',detail:'Задача проекта — помогать инициативным жителям находить единомышленников, экспертов и партнёров. В центре внимания — общественные пространства, добрососедство, локальная культура, экология и участие жителей в городских решениях.',links:[['ВКонтакте · Екатеринбург','https://vk.com/ekb_communitygs'],['Городские инициативы','https://vk.com/urban.initiatives'],['Региональный Telegram','https://t.me/newpeopleekb']]},
  {slug:'captains',name:'Капитаны',mark:'К',tag:'ОБРАЗОВАНИЕ',lead:'Факультет бизнеса и предпринимательское сообщество с практическим обучением и наставничеством.',achievement:'Проект работает с 2016 года; в сообществе — более 900 студентов из 60 регионов.',links:[['Telegram','https://t.me/captains_faculty'],['Подробный раздел','#captains']]},
  {slug:'icebreaker',name:'Ледокол изменений',mark:'ЛЁД',tag:'ЛИДЕРСКИЕ ПРАКТИКИ',lead:'Сообщество и образовательные форматы для людей, которые запускают общественные изменения и собирают команды.',achievement:'Региональные команды проводят встречи, практикумы и проектные сессии.',links:[['ВКонтакте','https://vk.com/ledokol_izmeneniy'],['Telegram партии','https://t.me/partynewpeople']]},
  {slug:'newlife',name:'Жить по-новому',mark:'ЖИТЬ',tag:'КАЧЕСТВО ЖИЗНИ',lead:'Локальные инициативы о городской среде, повседневном комфорте и практических изменениях рядом с домом.',achievement:'Форматы проекта используются региональными командами для работы с запросами жителей.',links:[['Сайт партии','https://newpeople.ru/'],['ВКонтакте партии','https://vk.com/party.newpeople']]},
  {slug:'neirolab',name:'Нейролаб',mark:'AI',tag:'ТЕХНОЛОГИИ',lead:'Центр технологий искусственного интеллекта: бесплатное обучение, поддержка разработчиков и развитие российских ИИ-проектов.',achievement:'По данным проекта, бесплатные программы освоили 100 тысяч жителей регионов.',links:[['Сайт','https://neirolab.ru/'],['О центре','https://neirolab.ru/about'],['ВКонтакте','https://vk.com/neirolab_ru']]}
];

function projectLinks(items){return items.map(([label,url])=>url.startsWith('#')?`<button type="button" data-module="${url.slice(1)}">${label} →</button>`:`<a href="${url}" target="_blank" rel="noreferrer">${label} →</a>`).join('')}
function projectsLesson(){const featured=partyProjects.filter(p=>p.detail),others=partyProjects.filter(p=>!p.detail);return `<header class="lesson-title projects-title"><span class="icon">◆</span><div><h1>Проекты партии</h1><p>Флагманские федеральные инициативы и проекты, представленные в региональной образовательной программе.</p></div></header>
<section class="projects-intro"><b>Главный принцип</b><p>Проекты превращают партийные темы в практическую работу: обучение, экологические акции, поддержку культуры, городских инициатив и новых технологий.</p></section>
<div class="featured-projects">${featured.map((p,i)=>`<article class="featured-project project-${p.slug}"><div class="project-brand"><div class="project-logo" aria-label="Логотип проекта ${p.name}">${p.mark}</div><div><span>${p.tag}</span><h2>${p.name}</h2></div></div><p class="project-lead">${p.lead}</p><div class="project-detail"><h3>Как работает</h3><p>${p.detail}</p></div><div class="project-achievement"><b>Достижение</b><p>${p.achievement}</p></div><div class="project-socials">${projectLinks(p.links)}</div></article>`).join('')}</div>
<section class="other-projects"><div class="project-section-head"><span>ЕЩЁ ПРОЕКТЫ</span><h2>Образование, лидерство и технологии</h2></div><div class="project-card-grid">${others.map(p=>`<article class="project-card"><div class="project-logo small">${p.mark}</div><span>${p.tag}</span><h3>${p.name}</h3><p>${p.lead}</p><div class="mini-achievement"><b>Результат:</b> ${p.achievement}</div><div class="project-socials">${projectLinks(p.links)}</div></article>`).join('')}</div></section>
<div class="projects-note"><b>Важно:</b> состав и масштабы проектов меняются. Перед публичным использованием цифр проверяйте их по официальным ссылкам в карточках.</div>`}

const lessons = {
  projects: projectsLesson,
  links: () => `<header class="lesson-title links-title">
<span class="icon">↗</span>
<div>
<h1>Полезные ссылки</h1>
<p>Официальные сайты, социальные сети партии, региональной команды, проектов и ключевых представителей.</p>
</div>
</header>
<section class="links-directory">
<h2>ОГЛАВЛЕНИЕ</h2>
<div class="directory-jumps">
<a href="#links-party">Партия</a>
<a href="#links-people">Люди</a>
<a href="#links-projects">Проекты</a>
</div>
</section>
<section id="links-party" class="link-section">
<div class="link-section-head">
<span>01</span>
<div>
<h2>ПАРТИЯ И СВЕРДЛОВСКОЕ ОТДЕЛЕНИЕ</h2>
<p>Основные площадки для новостей, заявлений, региональной повестки и обратной связи.</p>
</div>
</div>
<div class="social-card-grid">
<article class="social-card party-social-card">
<div class="social-portrait">
<img src="assets/social/party.jpg" alt="Новые люди" loading="lazy">
</div>
<div class="social-card-body">
<h3>Партия «Новые люди»</h3>
<p>Федеральная политическая партия и фракция в Государственной Думе.</p>
<div class="social-links">
<a href="https://newpeople.ru/" target="_blank" rel="noreferrer">Сайт</a>
<a href="https://vk.com/party.newpeople" target="_blank" rel="noreferrer">ВКонтакте</a>
<a href="https://t.me/partynewpeople" target="_blank" rel="noreferrer">Telegram</a>
</div>
</div>
</article>
<article class="social-card party-social-card">
<div class="social-portrait">
<img src="assets/social/region.jpg" alt="Новые люди — Свердловская область" loading="lazy">
</div>
<div class="social-card-body">
<h3>Свердловская область</h3>
<p>Региональное отделение партии в Екатеринбурге и Свердловской области.</p>
<div class="social-links">
<a href="https://newpeople66.ru/" target="_blank" rel="noreferrer">Сайт</a>
<a href="https://vk.com/newpeopleekb" target="_blank" rel="noreferrer">ВКонтакте</a>
<a href="https://t.me/newpeopleekb" target="_blank" rel="noreferrer">Telegram</a>
</div>
</div>
</article>
</div>
</section>
<section id="links-people" class="link-section">
<div class="link-section-head">
<span>02</span>
<div>
<h2>ЛЮДИ</h2>
<p>Личные каналы, страницы и связанные с работой проекты. Добавлены только подтверждённые публичные адреса.</p>
</div>
</div>
<div class="social-card-grid people-cards">
<article class="social-card">
<div class="social-portrait person">
<img src="assets/social/demin.jpg" alt="Александр Дёмин" loading="lazy">
</div>
<div class="social-card-body">
<h3>Александр Дёмин</h3>
<p>Депутат Госдумы, председатель Комитета по малому и среднему предпринимательству; развивал программу «Капитаны».</p>
<div class="social-links">
<a href="https://t.me/demin_captains" target="_blank" rel="noreferrer">Telegram</a>
<a href="https://t.me/captains_faculty" target="_blank" rel="noreferrer">Капитаны</a>
<a href="https://vk.com/yavde1e" target="_blank" rel="noreferrer">Я в деле</a>
</div>
</div>
</article>
<article class="social-card">
<div class="social-portrait person">
<img src="assets/gallery/rant-01.jpg" alt="Рант Краев" loading="lazy">
</div>
<div class="social-card-body">
<h3>Рант Краев</h3>
<p>Депутат Законодательного Собрания Свердловской области, руководитель региональной фракции.</p>
<div class="social-links">
<a href="https://vk.com/newpeopleekb" target="_blank" rel="noreferrer">ВКонтакте отделения</a>
<a href="https://t.me/newpeopleekb" target="_blank" rel="noreferrer">Telegram отделения</a>
</div>
</div>
</article>
<article class="social-card">
<div class="social-portrait person">
<img src="assets/gallery/region-01.jpg" alt="Ирина Виноградова и региональная команда" loading="lazy">
</div>
<div class="social-card-body">
<h3>Ирина Виноградова</h3>
<p>Руководитель Свердловского регионального отделения партии, политолог и преподаватель.</p>
<div class="social-links">
<a href="https://t.me/ivinovino" target="_blank" rel="noreferrer">Telegram</a>
<a href="https://vk.com/newpeopleekb" target="_blank" rel="noreferrer">ВКонтакте отделения</a>
</div>
</div>
</article>
<article class="social-card">
<div class="social-portrait person">
<img src="assets/social/nechaev.jpg" alt="Алексей Нечаев" loading="lazy">
</div>
<div class="social-card-body">
<h3>Алексей Нечаев</h3>
<p>Председатель партии «Новые люди», руководитель фракции в Госдуме, предприниматель и основатель Faberlic.</p>
<div class="social-links">
<a href="https://t.me/nechaev_official" target="_blank" rel="noreferrer">Telegram</a>
<a href="https://vk.com/party.newpeople" target="_blank" rel="noreferrer">ВКонтакте</a>
<a href="https://faberlic.com/" target="_blank" rel="noreferrer">Faberlic</a>
</div>
</div>
</article>
<article class="social-card">
<div class="social-portrait person">
<img src="assets/social/davankov.jpg" alt="Владислав Даванков" loading="lazy">
</div>
<div class="social-card-body">
<h3>Владислав Даванков</h3>
<p>Заместитель председателя Государственной Думы, депутат фракции «Новые люди».</p>
<div class="social-links">
<a href="https://t.me/davankov" target="_blank" rel="noreferrer">Telegram</a>
<a href="https://vk.com/vladdavankov" target="_blank" rel="noreferrer">ВКонтакте</a>
</div>
</div>
</article>
<article class="social-card">
<div class="social-portrait person">
<img src="assets/social/sardana.jpg" alt="Сардана Авксентьева" loading="lazy">
</div>
<div class="social-card-body">
<h3>Сардана Авксентьева</h3>
<p>Депутат Государственной Думы от «Новых людей», бывший глава Якутска.</p>
<div class="social-links">
<a href="https://t.me/RealSardana" target="_blank" rel="noreferrer">Telegram</a>
<a href="https://vk.com/sardanav" target="_blank" rel="noreferrer">ВКонтакте</a>
</div>
</div>
</article>
<article class="social-card">
<div class="social-portrait person">
<img src="assets/social/goryacheva.jpg" alt="Ксения Горячева" loading="lazy">
</div>
<div class="social-card-body">
<h3>Ксения Горячева</h3>
<p>Депутат Госдумы, первый заместитель председателя Комитета по науке и высшему образованию, автор образовательных проектов.</p>
<div class="social-links">
<a href="https://t.me/DeputatGoryacheva" target="_blank" rel="noreferrer">Telegram</a>
<a href="https://vk.com/k_mighty" target="_blank" rel="noreferrer">ВКонтакте</a>
<a href="https://vk.com/yavde1e" target="_blank" rel="noreferrer">Я в деле</a>
</div>
</div>
</article>
</div>
</section>
<section id="links-projects" class="link-section">
<div class="link-section-head">
<span>03</span>
<div>
<h2>ПРОЕКТЫ</h2>
<p>Образовательные и общественные площадки, связанные с командой.</p>
</div>
</div>
<div class="project-link-grid">
<a href="https://t.me/captains_faculty" target="_blank" rel="noreferrer">
<b>Капитаны</b>
<span>Факультет бизнеса и предпринимательское сообщество →</span>
</a>
<a href="https://vk.com/yavde1e" target="_blank" rel="noreferrer">
<b>Я в деле</b>
<span>Федеральная программа молодёжного предпринимательства →</span>
</a>
<a href="https://t.me/yavde1e" target="_blank" rel="noreferrer">
<b>Я в деле — Telegram</b>
<span>Новости, наборы и истории участников →</span>
</a>
</div>
</section>
<div class="links-warning">
<b>Важно:</b> адреса социальных сетей могут меняться. Если ссылка перестала открываться, проверяйте актуальный профиль через официальный канал партии.</div>`,
  captains: () => `<header class="lesson-title captains-title">
<span class="icon">К</span>
<div>
<h1>Факультет «Капитаны»</h1>
<p>Практико-ориентированная образовательная программа и сообщество для будущих предпринимателей, управленцев и лидеров проектов.</p>
</div>
</header>
<div class="fact-strip">
<div class="fact">
<b>2016</b>факультет создан в РЭУ им. Г. В. Плеханова вместе с фондом «Капитаны»</div>
<div class="fact">
<b>900+</b>студентов — по данным официального канала проекта</div>
<div class="fact">
<b>60</b>регионов России представлены среди студентов</div>
</div>
<section class="captains-intro">
<p>
<b>Коротко:</b> «Капитаны» соединяют университетское образование, проектную работу и наставничество. Студенты не только изучают менеджмент, но уже с первого курса создают социальные и бизнес-проекты, защищают решения перед практиками и работают в командах.</p>
</section>
<div class="content-grid captains-grid">
<section class="info-card">
<h2>Как появился проект</h2>
<p>В 2016 году Благотворительный фонд поддержки образовательных программ «Капитаны» вместе с РЭУ им. Г. В. Плеханова создал факультет бизнеса. С 2018 года программа стала масштабироваться через филиалы РЭУ и другие российские вузы.</p>
</section>
<section class="info-card">
<h2>Миссия</h2>
<p>Готовить эффективных управленцев, предпринимателей, лидеров социальной сферы и государственного управления — людей с активной гражданской позицией и навыком доводить идеи до результата.</p>
</section>
<section class="info-card wide">
<h2>Ключевые лица и роли</h2>
<div class="people-grid">
<article>
<b>Алексей Нечаев</b>
<span>инициатор образовательной экосистемы и один из основателей фонда поддержки программы.</span>
</article>
<article>
<b>Александр Дёмин</b>
<span>с 2015 года работал в фонде; в 2016–2021 годах — на факультете бизнеса «Капитаны» в РЭУ. Участвовал в масштабировании программы в регионы.</span>
</article>
<article>
<b>Команда вузов</b>
<span>профессора, доктора наук и преподаватели обеспечивают академическую основу обучения.</span>
</article>
<article>
<b>Предприниматели и наставники</b>
<span>практики из бизнеса и управления, а также старшекурсники-«держатели» сопровождают младшие курсы и команды.</span>
</article>
</div>
</section>
<section class="info-card wide">
<h2>Что входит в программу</h2>
<div class="program-steps">
<article>
<span>01</span>
<h3>Управление</h3>
<p>Стратегия, проектное управление, принятие решений и ответственность за результат.</p>
</article>
<article>
<span>02</span>
<h3>Предпринимательство</h3>
<p>Поиск идеи, проверка гипотез, бизнес-модель, финансы, маркетинг и продажи.</p>
</article>
<article>
<span>03</span>
<h3>Реальные проекты</h3>
<p>Социальные и предпринимательские проекты с первого курса, командная работа и публичная защита.</p>
</article>
<article>
<span>04</span>
<h3>Наставничество</h3>
<p>Работа с преподавателями-практиками и старшими студентами; возможность самому стать наставником.</p>
</article>
<article>
<span>05</span>
<h3>Soft skills</h3>
<p>Переговоры, презентация, коммуникация, лидерство, книжный клуб, го и командные практики.</p>
</article>
<article>
<span>06</span>
<h3>Среда</h3>
<p>Интенсивы, «Кампус», проектные сессии, клуб выпускников, стажировки и межрегиональные связи.</p>
</article>
</div>
</section>
<section class="info-card">
<h2>Траектории развития</h2>
<ul>
<li>
<b>Предпринимательская:</b> запуск бизнеса или стартапа.</li>
<li>
<b>Управленческая:</b> работа в компаниях и общественных структурах.</li>
<li>
<b>Наставническая:</b> сопровождение школьников и младших студентов.</li>
<li>
<b>Методическая:</b> разработка образовательных форматов.</li>
</ul>
</section>
<section class="info-card">
<h2>Где работает</h2>
<p>В официальном канале названы Москва, Томск, Уральск, Ростов-на-Дону, Новосибирск, Тюмень, Омск, Севастополь и Самара. Состав площадок может меняться — актуальный набор лучше проверять перед поступлением.</p>
<div class="tag-row">
<span class="tag">9 площадок</span>
<span class="tag">межрегиональная сеть</span>
<span class="tag">университетская база</span>
</div>
</section>
<section class="info-card wide achievements">
<h2>Достижения проекта</h2>
<div class="achievement-grid">
<article>
<b>900+</b>
<span>студентов обучаются на факультете</span>
</article>
<article>
<b>60</b>
<span>регионов представлены среди студентов</span>
</article>
<article>
<b>880</b>
<span>выпускников объединял клуб по публикации официального канала</span>
</article>
<article>
<b>9</b>
<span>региональных площадок перечислены проектом</span>
</article>
</div>
<ul>
<li>Программа выросла из одного факультета РЭУ в межрегиональное образовательное сообщество.</li>
<li>Выпускники работают руководителями и менеджерами российских компаний, создают бизнесы и стартапы.</li>
<li>РЭУ сообщал о победах студентов факультета в конкурсе «Студенческий стартап».</li>
<li>Вокруг факультета сложилась экосистема: клуб выпускников, школьные программы, интенсивы и связанный федеральный проект «Я в деле».</li>
</ul>
</section>
<section class="info-card wide">
<div class="callout">
<b>Как объяснить за 20 секунд:</b> «Капитаны» — это факультет и сообщество, где будущих предпринимателей и управленцев учат через реальные проекты. Студент с первого курса работает в команде, получает наставника, проверяет идеи на практике и выходит с опытом, портфолио и профессиональными связями.</div>
</section>
<section class="info-card wide official-links">
<h2>Официальные страницы</h2>
<a href="https://www.rea.ru/structure/hs/fakultet-biznesa-kapitanyi/abiturientu" target="_blank" rel="noreferrer">Факультет в РЭУ им. Г. В. Плеханова →</a>
<a href="https://t.me/captains_faculty" target="_blank" rel="noreferrer">Официальный Telegram-канал →</a>
<a href="https://www.sseu.ru/vneuchebnaya-deyatelnost/obrazovatelnyy-proekt-kapitany" target="_blank" rel="noreferrer">Программа «Капитаны» в СГЭУ →</a>
</section>
</div>
<p class="data-note">Цифры приведены по публичным материалам официального канала и страниц вузов на июль 2026 года; набор, география и показатели могут обновляться.</p>
<button class="captains-back" type="button" data-module="demin">← Вернуться к Александру Дёмину</button>`,
  presentation: () => `<header class="lesson-title">
<span class="icon">▶</span>
<div>
<h1>Презентация партии</h1>
<p>Листайте слайды или выберите нужный номер. Изображения встроены в приложение и доступны без интернета.</p>
</div>
</header>
<div class="slide-shell">
<div class="slide-frame">
<img id="slide-image" src="${slides[0]}" alt="Слайд 1">
</div>
<div class="slide-controls">
<button id="prev-slide" aria-label="Предыдущий слайд">←</button>
<span class="slide-dots">
<b id="slide-current">1</b> / ${slides.length}</span>
<button id="next-slide" aria-label="Следующий слайд">→</button>
</div>
<div class="slide-thumbs">${slides.map((s,i)=>`<button class="slide-thumb ${i===0?'active':''}" data-slide="${i}" aria-label="Слайд ${i+1}">
<img src="${s}" alt="">
</button>`).join('')}</div>
</div>`,
  deg: () => `<header class="lesson-title">
<span class="icon">✓</span>
<div>
<h1>Что такое ДЭГ</h1>
<p>Дистанционное электронное голосование — один из способов участия в выборах через интернет, если оно применяется на конкретных выборах и доступно избирателю.</p>
</div>
</header>
<div class="fact-strip">
<div class="fact">
<b>Онлайн</b>голосование проходит на официальной государственной платформе</div>
<div class="fact">
<b>Заранее</b>порядок и сроки определяются для конкретной кампании</div>
<div class="fact">
<b>Добровольно</b>избиратель сам выбирает доступный способ голосования</div>
</div>
<div class="content-grid">
<section class="info-card">
<h2>Как это устроено</h2>
<ul>
<li>Избиратель проходит идентификацию через подтверждённую государственную учётную запись.</li>
<li>При необходимости заранее подаёт заявление на участие.</li>
<li>В дни голосования получает доступ к электронному бюллетеню.</li>
<li>Система учитывает голос без раскрытия выбора посторонним.</li>
</ul>
</section>
<section class="info-card">
<h2>Что важно говорить точно</h2>
<ul>
<li>ДЭГ проводится не автоматически на всех выборах и не во всех регионах.</li>
<li>Сроки подачи заявления и площадку всегда нужно проверять в официальных источниках.</li>
<li>Нельзя просить человека показывать, за кого он проголосовал.</li>
<li>Нельзя обещать регистрацию или доступ без проверки официальных условий.</li>
</ul>
</section>
<section class="info-card wide">
<div class="callout">
<b>Короткая формулировка:</b> «ДЭГ — это возможность проголосовать дистанционно через официальную государственную систему. Доступность и сроки регистрации зависят от конкретных выборов».</div>
</section>
</div>
<div class="check">
<h3>Самопроверка</h3>
<label>
<input type="radio" name="q-deg" value="0"> ДЭГ всегда доступно каждому без регистрации</label>
<label>
<input type="radio" name="q-deg" value="1"> Условия ДЭГ нужно проверять для конкретных выборов</label>
<button class="quiz-button" data-answer="1">Проверить</button>
<div class="check-result">
</div>
</div>
<div class="sources">
<a href="https://vybory.gov.ru/" target="_blank" rel="noreferrer">Официальная информация ЦИК России</a>
</div>`,
  demin: () => `<header class="lesson-title">
<span class="icon">Д</span>
<div>
<h1>Александр Дёмин</h1>
<p>Федеральный депутат и один из ключевых представителей предпринимательской повестки партии.</p>
</div>
</header>
<div class="fact-strip">
<div class="fact">
<b>1988</b>родился 23 сентября в Ростове-на-Дону</div>
<div class="fact">
<b>2021</b>избран депутатом Государственной Думы VIII созыва</div>
<div class="fact">
<b>МСП</b>председатель профильного комитета Госдумы</div>
</div>
<div class="content-grid">
<section class="info-card">
<h2>Текущая роль</h2>
<p>Депутат фракции «Новые люди», председатель Комитета Государственной Думы по малому и среднему предпринимательству, заместитель руководителя фракции.</p>
</section>
<section class="info-card">
<h2>Основные темы</h2>
<div class="tag-row">
<span class="tag">малый бизнес</span>
<span class="tag">самозанятые</span>
<span class="tag">кредитование</span>
<span class="tag">регуляторная нагрузка</span>
<span class="tag">цифровая экономика</span>
</div>
</section>
<section class="info-card wide">
<h2>Что можно назвать</h2>
<ul>
<li>Работа над мерами финансовой поддержки малого и среднего бизнеса.</li>
<li>Предложения по кредитным каникулам, доступности финансирования и снижению административного давления.</li>
<li>Участие в развитии партийной сети: до избрания в Госдуму руководил масштабированием штабов партии в регионах.</li>
<li>В 2026 году выдвинут партией от Свердловской области.</li>
</ul>
</section>
<section class="info-card wide">
<div class="callout">
<b>Важно:</b> не приписывайте депутату единоличное авторство коллективных законов. Корректные формулировки: «участвовал в разработке», «выступил с предложением», «комитет под его руководством работал над…».</div>
</section>
</div>${sourceLinks}`,
  rant: () => `<header class="lesson-title">
<span class="icon">Р</span>
<div>
<h1>Рант Краев</h1>
<p>Депутат Законодательного Собрания Свердловской области и руководитель фракции «Новые люди» в региональном парламенте.</p>
</div>
</header>
<div class="fact-strip">
<div class="fact">
<b>2021</b>избран в Законодательное Собрание Свердловской области</div>
<div class="fact">
<b>Фракция</b>руководит командой «Новых людей» в областном парламенте</div>
<div class="fact">
<b>Регион</b>работает с инициативами жителей, бизнеса и городских сообществ</div>
</div>
<div class="content-grid">
<section class="info-card">
<h2>Текущая роль</h2>
<p>Представляет «Новых людей» в Законодательном Собрании Свердловской области, возглавляет партийную фракцию и участвует в формировании региональной повестки.</p>
</section>
<section class="info-card">
<h2>Ключевые направления</h2>
<div class="tag-row">
<span class="tag">малый бизнес</span>
<span class="tag">самозанятые</span>
<span class="tag">городская среда</span>
<span class="tag">культурные проекты</span>
<span class="tag">работа с обращениями</span>
</div>
</section>
<section class="info-card wide">
<h2>Что можно назвать</h2>
<ul>
<li>Организация открытого диалога предпринимателей, экспертов и представителей власти по вопросам поддержки малого бизнеса.</li>
<li>Общественные проекты в Екатеринбурге: поддержка творческих инициатив, городских событий и семейных мероприятий.</li>
<li>Работа с региональной командой и участие в подготовке кандидатов партии к выборам разных уровней.</li>
<li>На региональном съезде 2026 года подвёл итоги работы отделения и обозначил задачу усилить представительство партии в Заксобрании.</li>
</ul>
</section>
<section class="info-card wide">
<div class="callout">
<b>Короткая формулировка:</b> «Рант Краев — руководитель фракции “Новые люди” в свердловском Заксобрании. Его основные темы — предпринимательство, городские инициативы и практическая работа региональной команды».</div>
</section>
</div>
<div class="sources">
<b>Источники:</b> <a href="https://newpeople66.ru/" target="_blank" rel="noreferrer">региональный сайт</a> · <a href="https://www.kommersant.ru/gallery/8796598" target="_blank" rel="noreferrer">региональный съезд 2026</a> · <a href="https://www.ural.kp.ru/daily/27723/5112150/" target="_blank" rel="noreferrer">встреча с предпринимателями</a>
</div>`,
  region: () => `<header class="lesson-title">
<span class="icon">66</span>
<div>
<h1>Свердловское отделение</h1>
<p>Региональная команда представляет партию на федеральном, областном и муниципальном уровнях.</p>
</div>
</header>
<div class="content-grid">
<section class="info-card">
<h2>Ключевые лица</h2>
<ul>
<li>
<b>Ирина Виноградова</b> — руководитель регионального отделения.</li>
<li>
<b>Рант Краев</b> — руководитель фракции в Законодательном собрании области.</li>
<li>
<b>Сергей Козин</b> — депутат Законодательного собрания.</li>
</ul>
</section>
<section class="info-card">
<h2>Уровни работы</h2>
<ul>
<li>Федеральный: депутаты Государственной Думы.</li>
<li>Региональный: Законодательное собрание Свердловской области.</li>
<li>Муниципальный: городские думы и местные команды.</li>
<li>Проектный: общественные инициативы и тематические комитеты.</li>
</ul>
</section>
<section class="info-card wide">
<h2>Электоральный контекст из презентации</h2>
<div class="fact-strip">
<div class="fact">
<b>9,19%</b>Заксобрание области, 2021</div>
<div class="fact">
<b>8,23%</b>Госдума, 2021</div>
<div class="fact">
<b>8,5%</b>Екатеринбургская гордума, 2023</div>
</div>
<p>Эти цифры относятся к конкретным кампаниям и не являются текущим рейтингом партии.</p>
</section>
<section class="info-card wide">
<h2>Что предлагает участие в команде</h2>
<div class="tag-row">
<span class="tag">первичные отделения</span>
<span class="tag">экспертные комитеты</span>
<span class="tag">общественные проекты</span>
<span class="tag">наблюдение</span>
<span class="tag">кандидатский трек</span>
</div>
</section>
</div>${sourceLinks}`,
  party: () => `<header class="lesson-title">
<span class="icon">#</span>
<div>
<h1>Главное о партии</h1>
<p>Минимальная фактологическая база, которую нужно знать без подсказки.</p>
</div>
</header>
<div class="fact-strip">
<div class="fact">
<b>2020</b>партия основана 1 марта</div>
<div class="fact">
<b>5,32%</b>результат на выборах в Госдуму 2021 года</div>
<div class="fact">
<b>15</b>депутатов во фракции на момент подготовки модуля</div>
</div>
<div class="content-grid">
<section class="info-card">
<h2>Кто основал</h2>
<p>
<b>Алексей Нечаев</b> — основатель партии и руководитель фракции в Госдуме. Партия получила государственную регистрацию в 2020 году.</p>
</section>
<section class="info-card">
<h2>Как позиционируется</h2>
<p>«Партия здравого смысла»: развитие вместо запретов, доверие к людям, поддержка предпринимательства, современные технологии и сильные регионы.</p>
</section>
<section class="info-card wide">
<h2>Программа 2026: основные направления</h2>
<div class="tag-row">
<span class="tag">доверие и достоинство</span>
<span class="tag">сильные регионы</span>
<span class="tag">доступное жильё</span>
<span class="tag">образование</span>
<span class="tag">самозанятые и стартапы</span>
<span class="tag">конкуренция</span>
<span class="tag">прозрачный бюджет</span>
<span class="tag">разумное регулирование интернета</span>
</div>
</section>
<section class="info-card">
<h2>Федеральные лица</h2>
<ul>
<li>Алексей Нечаев</li>
<li>Владислав Даванков</li>
<li>Сардана Авксентьева</li>
</ul>
</section>
<section class="info-card">
<h2>Правило точности</h2>
<p>Разделяйте три формулировки: партия <b>предлагает</b>, депутаты <b>внесли законопроект</b>, Госдума <b>приняла закон</b>. Это разные стадии.</p>
</section>
<section class="info-card wide">
<div class="callout">
<b>Если не знаете ответа:</b> не придумывайте. Скажите, что уточните информацию по официальным источникам. Фактическая точность важнее уверенного, но неверного ответа.</div>
</section>
</div>
<div class="check">
<h3>Самопроверка</h3>
<label>
<input type="radio" name="q-party" value="0"> Партия впервые прошла в Госдуму в 2016 году</label>
<label>
<input type="radio" name="q-party" value="1"> Партия впервые прошла в Госдуму в 2021 году</label>
<button class="quiz-button" data-answer="1">Проверить</button>
<div class="check-result">
</div>
</div>${sourceLinks}`
};

const grid=document.querySelector('#module-grid');
const nav=document.querySelector('#main-nav');
grid.innerHTML=modules.map((m,i)=>`<button class="module-card" data-module="${m.id}" style="--accent:${m.accent}">
<span class="num">${i+1}</span>
<h2>${m.title}</h2>
<p>${m.desc}</p>
<span class="time">${m.time} →</span>
</button>`).join('');
grid.insertAdjacentHTML('beforeend',`<button class="module-card captains-module-card" data-module="captains" style="--accent:#43d1c4">
<span class="num">9</span>
<h2>Проект «Капитаны»</h2>
<p>Факультет бизнеса, практическое обучение, наставничество и достижения сообщества.</p>
<span class="time">6 минут →</span>
</button>`);
nav.innerHTML=`<button data-home>Главная</button>`+modules.map((m,i)=>`<button data-module="${m.id}">${i+1}. ${m.title}</button>`).join('');

const catalog=document.querySelector('#catalog'),lesson=document.querySelector('#lesson'),content=document.querySelector('#lesson-content');
function showCatalog(){catalog.classList.add('active');lesson.classList.remove('active');history.replaceState(null,'','#catalog');document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));window.scrollTo(0,0)}
function openModule(id){const index=modules.findIndex(m=>m.id===id),isHidden=id==='captains';if(index<0&&!isHidden)return;catalog.classList.remove('active');lesson.classList.add('active');content.innerHTML=lessons[id]();if(id==='links'){const personalContact=content.querySelector('a[href="https://t.me/ivinovino"]');if(personalContact){personalContact.href='https://t.me/newpeopleekb';personalContact.textContent='Telegram-канал'}}if(id==='demin'){embedDeminRoadmap();embedCaptainsEntry()}embedPhotos(id);document.querySelector('#lesson-number').textContent=isHidden?'Спецраздел':`Модуль ${index+1} из ${modules.length}`;document.querySelector('#progress-bar').style.width=isHidden?'50%':`${(index+1)/modules.length*100}%`;document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('active',x.dataset.module===id));history.replaceState(null,'',`#${id}`);wireLesson(id);document.querySelector('.nav').classList.remove('open');document.querySelector('.menu-button').setAttribute('aria-expanded','false');window.scrollTo(0,0)}
function wireLesson(id){if(id==='presentation'){let current=0;const image=document.querySelector('#slide-image'),num=document.querySelector('#slide-current'),thumbs=[...document.querySelectorAll('.slide-thumb')];const set=n=>{current=(n+slides.length)%slides.length;image.src=slides[current];image.alt=`Слайд ${current+1}`;num.textContent=current+1;thumbs.forEach((t,i)=>t.classList.toggle('active',i===current))};document.querySelector('#prev-slide').onclick=()=>set(current-1);document.querySelector('#next-slide').onclick=()=>set(current+1);thumbs.forEach(t=>t.onclick=()=>set(Number(t.dataset.slide)))}document.querySelectorAll('.quiz-button').forEach(btn=>btn.onclick=()=>{const box=btn.closest('.check'),picked=box.querySelector('input:checked'),out=box.querySelector('.check-result');if(!picked){out.textContent='Выберите ответ.';return}out.textContent=picked.value===btn.dataset.answer?'Верно.':'Пока нет — перечитайте блок выше.';out.style.color=picked.value===btn.dataset.answer?'#08756e':'#b3293b'})}
document.addEventListener('click',e=>{const photo=e.target.closest('.content-photo a');if(photo){e.preventDefault();const cards=[...content.querySelectorAll('.content-photo a')];openLightbox(location.hash.slice(1),cards.indexOf(photo));return}const mod=e.target.closest('[data-module]');if(mod)openModule(mod.dataset.module);if(e.target.closest('[data-home]')||e.target.closest('.back-button'))showCatalog()});
document.querySelector('.menu-button').onclick=e=>{const open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open))};
const initial=location.hash.slice(1);if(modules.some(m=>m.id===initial)||initial==='captains')openModule(initial);else showCatalog();
