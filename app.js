const profiles={student:{name:'Jamie Lee',initials:'JL',title:'Student',icon:'●',home:'student-home'},teacher:{name:'Ms. Rivera',initials:'MR',title:'Teacher',icon:'◆',home:'teacher-home'},staff:{name:'Alex Rivera',initials:'AR',title:'Authorized staff',icon:'■',home:'staff-home'}};
let currentRole='student';
let toastTimer;
const toast=document.querySelector('#toast');

function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function showPage(pageId){document.querySelectorAll('.page').forEach(page=>page.classList.toggle('active',page.id===pageId));document.querySelectorAll('.nav-item').forEach(item=>item.classList.toggle('active',item.dataset.page===pageId));if(pageId==='student-week'){document.querySelectorAll('[data-schedule-view]').forEach(item=>item.classList.toggle('active',item.dataset.scheduleView==='weekly'));document.querySelectorAll('[data-schedule-panel]').forEach(panel=>panel.hidden=panel.dataset.schedulePanel!=='weekly');document.querySelector('.daily-day-picker').hidden=true}document.querySelector('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
function setRole(role){currentRole=role;const profile=profiles[role];document.querySelectorAll('.role-nav').forEach(nav=>nav.classList.remove('active'));document.querySelector(`#${role}Nav`).classList.add('active');document.querySelectorAll('.role-button').forEach(button=>button.classList.toggle('active',button.dataset.role===role));document.querySelector('#profileInitials').textContent=profile.initials;document.querySelector('#profileName').textContent=profile.name;document.querySelector('#roleTitle').textContent=profile.title;document.querySelector('#roleIcon').textContent=profile.icon;showPage(profile.home)}

document.querySelectorAll('.role-button').forEach(button=>button.addEventListener('click',()=>setRole(button.dataset.role)));
document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();showPage(button.dataset.page)}));
document.querySelectorAll('[data-go="home"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showPage(profiles[currentRole].home)}));
document.querySelector('#mobileMenu').addEventListener('click',()=>document.querySelector('#sidebar').classList.toggle('open'));
document.querySelector('#sidebarBackdrop').addEventListener('click',()=>document.querySelector('#sidebar').classList.remove('open'));
const requestedPortal=new URLSearchParams(window.location.search).get('portal');
setRole(profiles[requestedPortal]?requestedPortal:'student');

document.querySelectorAll('[data-schedule-view]').forEach(button=>button.addEventListener('click',()=>{const view=button.dataset.scheduleView;document.querySelectorAll('[data-schedule-view]').forEach(item=>item.classList.toggle('active',item===button));document.querySelectorAll('[data-schedule-panel]').forEach(panel=>panel.hidden=panel.dataset.schedulePanel!==view);document.querySelector('.daily-day-picker').hidden=view!=='daily'}));
const dailySchedule={
  'Monday, Nov 22':{date:'Monday · November 22',actions:'No actions',lessons:[['9:10–10:00','÷','orange','Math 6A','Equivalent ratios · Ms. Rivera','Completed','done'],['10:25–11:15','⌁','green','Science 6A','Energy transfer · Mr. Chen','No action','quiet'],['12:40–1:30','Aa','blue','English 6A','Argument writing · Ms. Patel','No action','quiet'],['2:05–2:55','◫','yellow','History 6A','Trade routes · Mr. Wilson','Done','done']]},
  'Tuesday, Nov 23':{date:'Tuesday · November 23',actions:'2 actions',lessons:[['9:10–10:00','÷','orange','Math 6A','Equivalent ratios · Ms. Rivera','Start check-in','student-checkin-form'],['10:25–11:15','⌁','green','Science 6A','Energy transfer · Mr. Chen','No action','quiet'],['12:40–1:30','Aa','blue','English 6A','Argument writing · Ms. Patel','View update','student-updates'],['2:05–2:55','◫','yellow','History 6A','Early trade routes · Mr. Wilson','Done','done']]},
  'Wednesday, Nov 24':{date:'Wednesday · November 24',actions:'No actions',lessons:[['9:10–10:00','÷','orange','Math 6A','Ratio tables · Ms. Rivera','Upcoming','quiet'],['10:25–11:15','⌁','green','Science 6A','Heat lab · Mr. Chen','No action','quiet'],['12:40–1:30','Aa','blue','English 6A','Draft workshop · Ms. Patel','No action','quiet'],['2:05–2:55','◫','yellow','History 6A','Primary sources · Mr. Wilson','No action','quiet']]},
  'Thursday, Nov 25':{date:'Thursday · November 25',actions:'1 action',lessons:[['9:10–10:00','÷','orange','Math 6A','Unit practice · Ms. Rivera','No action','quiet'],['10:25–11:15','⌁','green','Science 6A','Lab reflection · Mr. Chen','View update','student-updates'],['12:40–1:30','Aa','blue','English 6A','Peer review · Ms. Patel','No action','quiet'],['2:05–2:55','◫','yellow','History 6A','Map activity · Mr. Wilson','No action','quiet']]},
  'Friday, Nov 26':{date:'Friday · November 26',actions:'No actions',lessons:[['9:10–10:00','÷','orange','Math 6A','Quick review · Ms. Rivera','Upcoming','quiet'],['10:25–11:15','⌁','green','Science 6A','Review · Mr. Chen','No action','quiet'],['12:40–1:30','Aa','blue','English 6A','Revision · Ms. Patel','No action','quiet'],['2:05–2:55','◫','yellow','History 6A','Reflection · Mr. Wilson','No action','quiet']]}
};
function renderDailySchedule(day){const schedule=dailySchedule[day];document.querySelector('#dailyDate').textContent=schedule.date;document.querySelector('#dailyActions').textContent=schedule.actions;document.querySelector('#dailyScheduleList').innerHTML=schedule.lessons.map(([time,icon,color,title,detail,action,target])=>{const actionMarkup=target==='student-checkin-form'||target==='student-updates'?`<button class="schedule-action ${target==='student-updates'?'secondary-action':''}" data-daily-page="${target}">${action}</button>`:`<span class="status ${target}">${action}</span>`;return `<article class="class-card"><time>${time}</time><span class="subject-icon ${color}">${icon}</span><div><strong>${title}</strong><small>${detail}</small></div>${actionMarkup}</article>`}).join('');document.querySelectorAll('[data-daily-page]').forEach(button=>button.addEventListener('click',()=>showPage(button.dataset.dailyPage)))}
const studentDaySelect=document.querySelector('#studentDaySelect');studentDaySelect.addEventListener('change',()=>renderDailySchedule(studentDaySelect.value));renderDailySchedule(studentDaySelect.value);

document.querySelector('#studentCheckinForm').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const privateNote=data.get('private')?' A private reply was requested.':'';showToast(`Check-in sent.${privateNote}`);setTimeout(()=>showPage('student-responses'),900)});
document.querySelector('#nothingToAdd').addEventListener('click',()=>{showToast('No feedback added. You can still ask for help later.');setTimeout(()=>showPage('student-home'),800)});
document.querySelectorAll('.feedback-button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.feedback-button').forEach(item=>item.classList.toggle('selected',item===button));showToast(`${button.dataset.feedback} sent to Ms. Rivera.`)}));

document.querySelector('#createCheckinForm').addEventListener('submit',event=>{event.preventDefault();showToast('Check-in created. QR and direct link are ready.')});
document.querySelector('#copyLink').addEventListener('click',event=>{event.currentTarget.textContent='Copied ✓';showToast('Student check-in link copied.')});
const qrModal=document.querySelector('#qrModal');
document.querySelector('#displayQr').addEventListener('click',()=>{qrModal.hidden=false;document.body.style.overflow='hidden'});
document.querySelector('.modal-close').addEventListener('click',()=>{qrModal.hidden=true;document.body.style.overflow='' });
qrModal.addEventListener('click',event=>{if(event.target===qrModal){qrModal.hidden=true;document.body.style.overflow=''}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!qrModal.hidden){qrModal.hidden=true;document.body.style.overflow=''}});

document.querySelectorAll('[data-expand]').forEach(button=>button.addEventListener('click',()=>{const panel=document.querySelector(`#${button.dataset.expand}`);panel.hidden=!panel.hidden;button.classList.toggle('active',!panel.hidden)}));
document.querySelector('#flagGroup').addEventListener('click',event=>{event.currentTarget.textContent='Flagged for review ✓';event.currentTarget.disabled=true;showToast('Grouping flagged. Original responses remain unchanged.')});
document.addEventListener('click',event=>{const button=event.target.closest('#saveTeachingPlan');if(!button)return;button.textContent='Saved ✓';button.disabled=true;document.querySelector('#draftStatus').textContent='Saved just now · private to you';showToast('Saved to your private lesson plan.')});
document.querySelectorAll('.private-reply').forEach(button=>button.addEventListener('click',event=>{event.currentTarget.textContent='Reply drafted ✓';showToast('Private reply draft created.')}));

document.querySelector('#simulateImport').addEventListener('click',()=>{showToast('Demo record imported and ready for verification.');setTimeout(()=>showPage('staff-verify'),800)});
const verifyCheckbox=document.querySelector('#verifyCheckbox');
const confirmSupport=document.querySelector('#confirmSupport');
verifyCheckbox.addEventListener('change',()=>confirmSupport.disabled=!verifyCheckbox.checked);
confirmSupport.addEventListener('click',()=>{confirmSupport.textContent='Confirmed for teacher planning ✓';confirmSupport.disabled=true;showToast('Support confirmed. Relevant teachers can now see it.');setTimeout(()=>showPage('staff-confirmed'),900)});
