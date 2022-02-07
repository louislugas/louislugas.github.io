var go   =  $('.play-btn')
var go2  =  $('.input-btn')
var cont1=  $('.title-container')
var cont2=  $('.input-container')
var cont3=  $('.intro-container')
var cont4=  $('.link-container')
var cont5=  $('.fight-container')
var cont6=  $('.epilog-container')
var winlose=$('.win-container')
var winimg= $('.win-img')
var transition = $('.transition')
var introNext = $('#intro-next')
var introBack = $('#intro-back')
var introSkip = $('#intro-skip')
var introPage = 1
var introP1 = $('#page-1')
var introP2 = $('#page-2')
var introP3 = $('#page-3')
var enemy = $('.enemy')
var player = $('.player')
var enemyName = $('.name-right')
var playerName = $('.name-left')
var profile = $('.profile')
var backreset = $('.back-btn')
var zodiacimg = $('.z-img')

//question
//Aburizal Bakrie
var quest1 = [
  {
    'q':"Who's the largest coal producer in Indonesia?",
    'a':'PT Kaltim Prima Coal',
    'b':'PT Bukit Asam',
    'ans':'a'
  },
  {
    'q':"Who's the CEO of PT Kaltim Prima Coal, the largest coal producer in Indonesia?",
    'a':"Adika Nuraga Bakrie (son of Aburizal Bakrie)",
    'b':"Boy Thohir (older brother of Erick Thohir)",
    'ans':'a'
  },
  {
    'q':"Who's Indonesia's biggest coal holding company that produced 81.1 million tons of coal in 2020?",
    'a':'PT Bumi Resources',
    'b':'Sinar Mas Mining Group',
    'ans':'a'
  },
  {
    'q':"All of the following are subsidiaries of PT Bumi Resources, except...",
    'a':"PT Dian Swastika, PT Agung Sentosa, and PT Karya Anak Bangsa",
    'b':"PT Kaltim Prima Coal, PT Arutmin Indonesia, and PT Pendopo Energi Batubara",
    'ans':'a'
  }
]
//Agus Lasmono
var quest2 = [
  {
    'q':"PT Indika Energy has coal mining concessions in East and Central Kalimantan covering a combined area bigger than Jakarta.",
    'a':'True',
    'b':'False',
    'ans':'a'
  },
  {
    'q':"Who's the owner of PT Indika Energy, Indonesia's fourth largest coal holding company in 2020?",
    'a':'Agus Lasmono',
    'b':'Benny Subianto',
    'ans':'a'
  },
  {
    'q':"How many tons of coal did PT Indika Energy produce in 2020?",
    'a':'30.2 million tons',
    'b':'34.3 million tons',
    'ans':'b'
  }
]
//Edwin Soeryadjaya
var quest3 = [
  {
    'q':"As of 2020, Edwin Soeryadjaya held direct and indirect shares totaling 65.82% in PT Saratoga Investama Sedaya, which controls PT Adaro Energy.",
    'a':'False',
    'b':'True',
    'ans':'b'
  },
  {
    'q':"Indonesia might have lost US$125 million in corporate income tax as PT Adaro Energy allegedly moved its profits offshore in the 2009-2017 period.",
    'a':'False',
    'b':'True',
    'ans':'b'
  },
  {
    'q':"All of the following are locations of PT Adaro Energy's coal mining operations, except…",
    'a':'North Sumatra & Bengkulu',
    'b':'Queensland in Australia & South Sumatra in Indonesia',
    'ans':'a'
  }
]
//Fuganto Widjaja
var quest4 = [
  {
    'q':'How many tons of coal did Sinar Mas Mining Group produce in 2020?',
    'a':'60 million tons',
    'b':'50 million tons',
    'ans':'a'
  },
  {
    'q':"Who's the CEO of Sinar Mas Mining, Indonesia's second largest coal holding company in 2020?",
    'a':'Sandiaga Uno',
    'b':'Fuganto Widjaja',
    'ans':'b'
  },
  {
    'q':"How big is Sinar Mas Mining Group's total coal mining area?",
    'a':'278,802 hectares',
    'b':'316,619 hectares',
    'ans':'a'
  }
]
//Garibaldi "Boy" Thohir
var quest5 = [
  {
    'q':"How big is Garibaldi Thohir's direct ownership stake in PT Adaro Energy?",
    'a':'43.91%',
    'b':'6.18%',
    'ans':'b'
  },
  {
    'q':"Erick Thohir is the younger brother of Garibaldi Thohir, the CEO of PT Adaro Energy.",
    'a':'True',
    'b':'False',
    'ans':'a'
  },
  {
    'q':"What's the original name of Garibaldi Thohir's coal mining company before being changed to PT Adaro Energy?",
    'a':'PT Padang Karunia',
    'b':'PT Lonely But Happy',
    'ans':'a'
  }
]
//Low Tuck Kwong
var quest6 = [
  {
    'q':"Who's the owner of PT Bayan Resources, which has coal mining concessions measuring 126,293 hectares in East and South Kalimantan?",
    'a':'Aburizal Bakrie',
    'b':'Low Tuck Kwong',
    'ans':'b'
  },
  {
    'q':"How many tons of coal did PT Bayan Resources produce in 2020?",
    'a':'34.3 million tons',
    'b':'30.2 million tons',
    'ans':'b'
  },
  {
    'q':"How big is Low Tuck Kwong's ownership stake in PT Bayan Resources?",
    'a':'29.03%',
    'b':'55.2%',
    'ans':'b'
  }
]
//Luhut Binsar Pandjaitan
var quest7 = [
  {
    'q':"What's Luhut Binsar Pandjaitan's official title in President Joko Widodo's second-term Cabinet?",
    'a':"Coordinating Minister for Maritime Affairs and Investment",
    'b':"Coordinating Minister for All Affairs",
    'ans':'a'
  },
  {
    'q':"What's the name of Luhut Binsar Pandjaitan's coal mining company?",
    'a':'PT Rakabu Sejahtra',
    'b':'PT TBS Energi Utama',
    'ans':'b'
  },
  {
    'q':"How big are Luhut Binsar Pandjaitan's coal mining concessions in East Kalimantan?",
    'a':'14,019 hectares',
    'b':'76,120 hectares',
    'ans':'a'
  },
  {
    'q':"Marsetio, Luhut's defense and security advisor, serves as vice-president commissioner at PT Berau Coal Energy, a part of Sinar Mas Mining Group.",
    'a':'True',
    'b':'False',
    'ans':'a'
  }
]
//Prabowo Subianto
var quest8 = [
  {
    'q':"How big are Prabowo Subianto's coal mining concessions in East Kalimantan?",
    'a':'At least 62,753 hectares',
    'b':'At least 278,802 hectares',
    'ans':'a'
  },
  {
    'q':"What's Prabowo Subianto's zodiac sign?",
    'a':'Libra',
    'b':'Gemini',
    'ans':'a'
  },
  {
    'q':"Sandiaga Uno was Prabowo Subianto's running mate in Indonesia's 2019 presidential election.",
    'a':'True',
    'b':'False',
    'ans':'a'
  }
]
//Sandiaga Uno
var quest9 = [
  {
    'q':"How big are PT Adaro Energy's coal mining concessions?",
    'a':'278,802 hectares',
    'b':'316,619 hectares',
    'ans':'b'
  },
  {
    'q':"As of 2020, Sandiaga Uno directly held a 21.51% stake in PT Saratoga Investama Sedaya, which controls PT Adaro Energy.",
    'a':'True',
    'b':'False',
    'ans':'a'
  },
  {
    'q':"When did PT Saratoga Investama Sedaya (co-founded by Sandiaga Uno) start investing in Adaro Group, Indonesia's third largest coal business group in 2020?",
    'a':'2002',
    'b':'1991',
    'ans':'a'
  }
]
//Erick Thohir
var quest10 = [
  {
    'q':"Apart from his role as State-Owned Enterprises Minister, Erick Thohir is also known as a media tycoon and sports group investor.",
    'a':'True',
    'b':'False',
    'ans':'a'
  },
  {
    'q':"MIND ID is a holding company for several state-owned mining firms with a total coal production of 25.15 million tons in 2020.",
    'a':'False',
    'b':'True',
    'ans':'b'
  },
  {
    'q':"What's the name of a paramilitary organization affiliated with Erick Thohir?",
    'a':'Banser',
    'b':'Pancasila Youth (locally known as Pemuda Pancasila)',
    'ans':'a'
  }
]

//NAVIGATION
//initialize first navbar condition
if(introPage == 1) {
    introBack.css('opacity',0.1)
    introBack.css('pointer-events','none')
  }

//intro page navigation
introNext.click(()=> {
  introPage++
  introNav()
  //intro to character select
  if (introPage == 4) {
    transition.css('display', 'block')
    setTimeout(() => {
      cont3.css('display','none')
      cont4.css('display','flex')
    }, 1000);
    setTimeout(wipeOut, 0)
    setTimeout(wipeIn, 1000)
    setTimeout(() => {
      transition.css('display','none')
    }, 2000);
  }
})
introBack.click(()=> {
  introPage--
  introNav()
})
function introNav() {
  if(introPage == 1) {
    introBack.css('opacity',0.1)
    introBack.css('pointer-events','none')
    introP1.css('display','flex')
    introP2.css('display','none')
    introP3.css('display','none')
  } else
  if (introPage == 2) {
    introBack.css('opacity',1)
    introBack.css('pointer-events','auto')
    introSkip.css('opacity',1)
    introSkip.css('pointer-events','auto')
    introP1.css('display','none')
    introP2.css('display','flex')
    introP3.css('display','none')
  } else
  if (introPage == 3) {
    introSkip.css('opacity',0.1)
    introSkip.css('pointer-events','none')
    introP1.css('display','none')
    introP2.css('display','none')
    introP3.css('display','flex')
  }
}

//title to input
go.click(()=> {
  transition.css('display', 'block')
  setTimeout(() => {
    cont1.css('display','none')
    cont2.css('display','flex')
  }, 1000);
  setTimeout(wipeOut, 0)
  setTimeout(wipeIn, 1000)
  setTimeout(() => {
    transition.css('display','none')
  }, 2000);
})

//input to intro
go2.click(()=> {
  let inputval = $('#fname').val()
  if (inputval=="") {
    alert('Name field can not be empty')
  } else {
    localStorage.setItem('player',inputval)
    transition.css('display', 'block')
    setTimeout(() => {
      cont2.css('display','none')
      cont3.css('display','flex')
    }, 1000);
    setTimeout(wipeOut, 0)
    setTimeout(wipeIn, 1000)
    setTimeout(() => {
      transition.css('display','none')
    }, 2000);
  }
  
})

//skip to character select
introSkip.click(()=> {
  transition.css('display', 'block')
    setTimeout(() => {
      cont3.css('display','none')
      cont4.css('display','flex')
    }, 1000);
    setTimeout(wipeOut, 0)
    setTimeout(wipeIn, 1000)
    setTimeout(() => {
      transition.css('display','none')
    }, 2000);
})

//transtiion function
function wipeIn() {  transition.removeClass('transitionout')
 transition.addClass('transitionin')
}
function wipeOut() {
  transition.removeClass('transitionin')
 transition.addClass('transitionout')
}

//SESSION VARIABLES
var sessions;

//CARD VARIABLES

var detailarticle = $('.article-container')
var articlecontent= $('.article')
var detailbutton  = $('.more-detail')
var backarticle   = $('.art-back-button')
var cardcontainer = $('.card-container')
var cardclose     = $('.card-close')
var flipcard      = $('.card-flipper-inner');

detailarticle.css('display','none')
detailarticle.css('opacity',0)

//LINK VARIABLES
var fight = $('.fight-button');
var linkcontainer= d3.select('.chara-link-container');
var level = 0;
var selevel;
var namechar = $('.sel-char');
var selaction= $('.sel-sel');
var zodiacCard = $('.zodiac-text')
var nameCard = $('.name-text')
var qlevel
var card1 = $('#cd-1')
var card2 = $('#cd-2')
var card3 = $('#cd-3')
var card4 = $('#cd-4')
var card5 = $('#cd-5')


var width = $(window).width();
var height = $(window).height();

var r,cx,cy,rad;

cardcontainer.css('display','none')

function checkSession() {
  //check level from last session
  level = localStorage.getItem('level')
}

function pushLevel() {
  //push level every win
  level++;
  localStorage.setItem('level',level)
  data[level].init = 1
  updateLink()
}

function updateLink() {
  circus // update circle color & cursor by level
  .style('fill',(d,i)=> {
    let init = d.init
    if (init==0) {
      return '#101025'
    } else {
      return '#DE5341'
    }
  })
  .style('cursor',(d,i)=> {
    let init = d.init
    if (init==0) {
      return 'no-drop'
    } else {
      return 'pointer'
    }
  })
    .on('mouseover', (d,i)=> {
    //console.log(d,i)
    let init = i.init
    let sel = i.index
    if (init == 1) {
      selevel = sel
      namechar.html(i.nama)
      d3
      .select(`#chara-circle-${sel}`)
      .transition()
      .duration(200)
      .style('fill','#CB1E58')
      .style('stroke','white')
      .style('stroke-width','3px')
    }
  })
  .on('mouseout', (d,i)=> {
    let init = i.init
    let sel = i.index
    if (init == 1) {
    circus
      .transition()
      .duration(200)
      .style('stroke','none')
      .style('fill',(d,i)=> {
    let init = d.init
    if (init==0) {
      return '#101025'
    } else {
      return '#DE5341'
    }
  })
    }
  })
  
  graphic // update character by level
  .attr('href', (d,i)=> {
    let init = d.init
    if (init==1) {
      return 'img/fight/' + d.imgfight
    }
  })
  .on('mouseover', (d,i)=> {
    //console.log(d,i)
    let init = i.init
    let sel = i.index
    if (init == 1) {
      selevel = sel
      namechar.html(i.nama)
      d3
      .select(`#chara-circle-${sel}`)
      .transition()
      .duration(200)
      .style('fill','#CB1E58')
      .style('stroke','white')
      .style('stroke-width','3px')
    }
  })
  .on('mouseout', (d,i)=> {
    let init = i.init
    let sel = i.index
    if (init == 1) {
    circus
      .transition()
      .duration(200)
      .style('stroke','none')
      .style('fill',(d,i)=> {
    let init = d.init
    if (init==0) {
      return '#101025'
    } else {
      return '#DE5341'
    }
  })
    }
  })
  
  text // update "?" character by level
    .text((d,i)=> {
      let init = d.init
      if (init==0) {
        return '?'
      }
    })
}

function resetSession() {
  //reset level to 0
  level = 0;
  localStorage.setItem('level',level)
  updateLink()
}

function resize() {
  let width = $(window).width();
  let height = $(window).height();
  cx = width/2
  cy = height/2
  if(height>width) { //vertical
    r = 0.75*width/2
  } else
  if (width>height) {//horizontal
    r = 0.75*height/2
  }
  rad = 0.28 * r
  
  svg
    .attr('width',width)
    .attr('height',height)
  
  clipPath
    .attr('cx', (d,i)=>{
    let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx
    return x;
  })
    .attr('cy',(d,i)=>{
    let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy
    return y;
  })
    .attr('r',rad);

  graphic
    .attr('width', 2*rad )
    .attr('height', 2*rad )
    .attr('x', (d,i)=>{
      let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx - rad
      return x;
    })
    .attr('y',(d,i)=>{
      let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy - rad
      return y;
    })
  
  circus
    .attr('r',rad)
    .attr('cx', (d,i)=>{
      let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx
      return x;
    })
    .attr('cy',(d,i)=>{
      let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy
      return y;
    })
  
  text
    .attr('x', (d,i)=>{
      let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx - rad
      return x;
})
    .attr('y',(d,i)=>{
  let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy -rad
  return y;
})
    .attr('dx',rad)
    .attr('dy',1.5*rad)
  
  namechar.css('width', (r - 0.5 * rad))
  namechar.css('text-align','center')
}
  
if(height>width) { //vertical
  r = 0.75*width/2
} else
if (width>height) {//horizontal
    r = 0.75*height/2
  }

rad  = 0.28 * r //every character circle radius

cx = width/2
cy = height/2

//console.log(width, height, cx, cy, r, rad)

var data = [
  {
  'nama':'Aburizal Bakrie',
  'init':1,
  'index':0,
  'zodiak':'Scorpio',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Bumi Resources',
  'card2':'<span class="strong">Extraction</span> : 81.1 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 136,985 hectares',
  'card4':'<span class="strong">Superpower</span> : Swimming through an ocean of debts',
  'card5':'<span class="strong">Afiliation</span> : Golkar political party',
  'artikel':"<p>PT Bumi Resources’ stock price stood at only Rp 67 at the end of December 2021, though it once reached Rp 8,750 in June 2008. The company’s steep value decline in the stock market has primarily been caused by the company’s piled-up debts, forcing Aburizal Bakrie and his family to <a style='color:#CB1E58' href='https://www.cnbcindonesia.com/market/20180919140338-17-33828/begini-cerita-keluarga-bakrie-kehilangan-kendali-di-bumi' target='_blank'>release their stocks</a> to their creditors. Seems like history repeats itself because the Bakrie Group has previously been trapped in a debt worth billions of US dollars due to the 1997 Asian financial crisis. At that time the Bakrie family was forced to let go of the majority of its shares in Bakrie Group’s holding company PT Bakrie and Brothers, causing its ownership percentage to shrink from 55% to merely <a style='color:#CB1E58' href='https://industri.kontan.co.id/news/kisah-grup-bakrie-lalui-krisis-demi-krisis' target='_blank'>2,5%</a>. <br><br><p><span style='font-size:1.2rem'>Golkar Party</span><p>It’s impossible to talk about Aburizal without at the same time bringing up the Golkar party. Aburizal once served as the party’s chairman for the 2014-2019 period. He currently leads the party’s advisory board, for the 2019-2024 period. Today, a number of Golkar party cadres occupy strategic governmental positions while maintaining their coal business networks.<br><br><p><span style='font-size:1.2rem'>Zodiac: Scorpio</span><p>People with a scorpio sign usually have a sinister vibe about them, whether because of their mysterious passion, intensity or style. They are highly aloof individuals, while guarding their private lives carefully. At the same time, they love challenges, danger and darkness. They will wait patiently, before pouncing to attack their enemies/prey when you least expect it.",
  'imgcard':'card-aburizal-bakrie.png',
  'imgfight':'fight-aburizal-bakrie.png'
  },
  {
  'nama':'Agus Lasmono',
  'init':0,
  'index':1,
  'zodiak':'Aries',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Indika Energy',
  'card2':'<span class="strong">Extraction</span> : 34.3 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 76,120 hectares',
  'card4':'<span class="strong">Superpower</span> : Reviving a dying business',
  'card5':'<span class="strong">Afiliation</span> : Cendana family',
  'artikel':"<p>The 1997-1998 Asian financial crisis crushed the businesses of Sudwikatmono, Agus Lasmono's father. Sudwikatmono, familiarly called Dwi, saw his Bank Subentra and Bank Surya go bankrupt. He also had to let go of his ownership of the 21 cineplex chain. Some of Dwi’s companies were then merged into the Indika Group, founded by his son Agus together with Arsjad Rasjid in 1995. Afterward, Agus led his family business revival under the Indika Group flag. The group ventured into coal business after its subsidiary, PT Indika Energy, took over PT Kideco Jaya Agung in 2004. In 2012, Indika Energy acquired two other coal miners: PT Multi Tambangjaya Utama and PT Mitra Energi Agung.<br><br><p><span style='font-size:1.2rem'>Cendana Family</span><p>Agus is a part of the notorious Cendana family, which refers to the family of former authoritarian president Soeharto. Dwi, his father, is the younger cousin of Soeharto. Tri Hanurita, his older sister, is a Golongan Karya (Golkar) party politician who once served as a member of the parliament’s Commission VII overseeing energy and mining. Tri’s husband is Dessano Indrasakti, a retired military officer who now serves as an expert staff member of Defense Minister Prabowo Subianto. Prabowo is the former husband of Siti Hediati Hariyadi a.k.a. Titiek, the second daughter of Soeharto.<br><br><p><span style='font-size:1.2rem'>Zodiac: Aries</span><p>Typically, an Aries is someone who is full of passion, fiery, in both their professions and romantic relationships alike. He is full of self-confidence and determination to make his brimming ambitions come true. He speaks bluntly, straightforwardly to the core of the problem. Understandably, he does not like people who beat around the bush. He is likely to just take an impulsive action and just think about the consequences later, and is undaunted by the prospect of doing dangerous things.",
  'imgcard':'card-agus-lasmono.png',
  'imgfight':'fight-agus-lasmono.png'
  },
  {
  'nama':'Edwin Soeryadjaya',
  'init':0,
  'index':2,
  'zodiak':'Cancer',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Adaro Energy',
  'card2':'<span class="strong">Extraction</span> : 54.53 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 316,619 hectares',
  'card4':'<span class="strong">Superpower</span> : Reverse card (Reversing life direction)',
  'card5':'<span class="strong">Afiliation</span> : Astra family',
  'artikel':"<p>Edwin is the son of tycoon William Soeryadjaya, the founder of diversified conglomerate Astra Group. In the 1990s, William was forced to sell his shares in Astra to help settle Bank Summa's responsibilities to its customers. Bank Summa, previously owned by Edward (Edwin's older brother), went bankrupt due to poor governance. During the difficult period, Edwin met Sandiaga Uno, and they agreed to collectively develop Edwin's investment company PT Saratoga Investama Sedaya. In 2002, Saratoga started investing in Adaro Group. As of 2020, Saratoga held direct and indirect shares totaling 58.46% in PT Adaro Energy (Adaro Group's coal holding company). At the same time, Edwin's direct and indirect shares in Saratoga reached 65.82%.<br><br><p><span style='font-size:1.2rem'>Astra family</span><p>Edwin is a close friend of Sandiaga, who was mentored by William while working for Bank Summa in the early 1990s. Edwin indirectly owns Adaro Energy, which is led by Garibaldi 'Boy' Thohir. Boy is the older brother of State-Owned Enterprises Minister Erick Thohir. Boy and Erick's father, Teddy Thohir, is a first-generation employee of Astra Group. Theodore Permadi Rachmat, William's nephew and Edwin's cousin, currently holds 2.54% shares in Adaro Energy. Arini Subianto, who owns 0.25% shares in Adaro Energy, is the daughter of Benny Subianto, formerly an Astra executive.<br><br><p><span style='font-size:1.2rem'>Zodiac: Cancer</span><p>Just like the crab which is the icon of this zodiac, a cancer feels most comfortable when he is inside his own shell or home, or when socializing with the closest members of his own inner circle. There is a thick wall surrounding him, although deep inside he is an emotionally volatile and hypersensitive individual. He has an awkward sense of humor. He is highly loyal and protective, capable of doing just about anything to protect his family and best friends.",
  'imgcard':'card-edwin-suryadjaya.png',
  'imgfight':'fight-edwin-suryadjaya.png'
  },
  {
  'nama':'Fuganto Widjaja',
  'init':0,
  'index':3,
  'zodiak':'Scorpio',
  'card1':'<span class="strong">Earth-crushing machine</span> : Sinar Mas Mining Group',
  'card2':'<span class="strong">Extraction</span> : 60 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 278,802.8 hectares',
  'card4':'<span class="strong">Superpower</span> : Stealth mode (making it hard to Google him)',
  'card5':'<span class="strong">Afiliation</span> : Retired military officers',
  'artikel':"<p>Aside from serving as the Sinar Mas Mining Group CEO, Fuganto also holds an important position in several of the group’s companies. For one, he is the executive chairman of the Golden Energy and Resources Limited, president commissioner of PT Roundhill Capital Indonesia, as well as the commissioner of PT Golden Energy Mines and PT Borneo Indobara. He also served as the general director of PT Berau Coal Energy from August 2015 to June 2021.<br><br><p><span style='font-size:1.2rem'>Military Circle</span><p>Suwandi, the executive director of PT Berau Coal Energy and PT Borneo Indobara, had a long career in the Army. His last rank was Major General. Meanwhile Marsetio, the deputy chief commissioner of PT Berau Coal Energy, used to be the Navy chief of staff for the 2012-2015 period with the last rank of admiral. Currently, Marsetio serves as defense and security advisor to Coordinating Minister for Maritime Affairs and Investment Luhut Binsar Pandjaitan.<br><br><p><span style='font-size:1.2rem'>Zodiac: Scorpio</span><p>People with a scorpio sign usually have a sinister vibe about them, whether because of their mysterious passion, intensity or style. They are highly aloof individuals, while guarding their private lives carefully. At the same time, they love challenges, danger and darkness. They will wait patiently, before pouncing to attack their enemies/prey when you least expect it.",
  'imgcard':'card-fuganto-widjaja.png',
  'imgfight':'fight-fuganto-widjaja.png'
  },
  {
  'nama':'Garibaldi "Boy" Thohir',
  'init':0,
  'index':4,
  'zodiak':'Taurus',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Adaro Energy',
  'card2':'<span class="strong">Extraction</span> : 54.53 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 316,619 hectares',
  'card4':'<span class="strong">Superpower</span> : Building strong networks in the circles of tycoons and government elites',
  'card5':'<span class="strong">Afiliation</span> : State-Owned Enterprises Minister Erick Thohir',
  'artikel':"<p>Garibaldi 'Boy' Thohir has been successful in building important networks, not only among fellow business magnates but also within the government elites. He is close to A.M. Hendropriyono, the former State Intelligence Agency head who is close to the Indonesian Democratic Party of Struggle (PDIP) chairwoman Megawati Soekarnoputri. Hendropriyono himself once served as the chief commissioner of PT Merdeka Copper Gold, which is partly owned by Boy.<br><br>In addition to his role as the executive director of coal miner PT Adaro Energy, Boy now serves as the president commissioner of Bhumi Rantau Energi, owned by the Hasnur Group, as well as the independent commissioner of PT Aplikasi Karya Anak Bangsa a.k.a. Gojek, which was established by Education, Culture, Research and Technology Minister Nadiem Makarim.<br><br><p><span style='font-size:1.2rem'>Brother of State-Owned Enterprises Minister Erick Thohir</span><p>Boy's younger brother, Erick Thohir, is the State-Owned Enterprises Minister who controls the Mining Industry Indonesia (MIND ID), a coal holding company for several government-owned mining companies. The main coal miner under the MIND ID umbrella is PT Bukit Asam. State-owned mining enterprises like PT Timah and PT Aneka Tambang also own several coal businesses, although these are relatively small-scale. MIND ID's total coal production amounted to 25.15 million tons in 2020.<br><br><p><span style='font-size:1.2rem'>Zodiac: Taurus</span><p>A Taurus is a dedicated hard worker and, oftentimes, a stubborn one, just like the bull character, which symbolizes this zodiac. He desires grand things and is not afraid to do just about anything in order to turn his plans into reality. He loves stability and values honesty. Because of this, it's hard for him to forgive those who he found had lied or deceived him.",
  'imgcard':'card-garibaldi-boy-thohir.png',
  'imgfight':'fight-garibaldi-boy-thohir.png'
  },
  {
  'nama':'Low Tuck Kwong',
  'init':0,
  'index':5,
  'zodiak':'Aries',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Bayan Resources',
  'card2':'<span class="strong">Extraction</span> : 30.2 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 126,293 hectares',
  'card4':'<span class="strong">Superpower</span> : Evading lawsuits',
  'card5':'<span class="strong">Afiliation</span> : N/A',
  'artikel':"<p>Low Tuck Kwong was born in Singapore in 1948. He moved to Indonesia at the age of 24 and soon started his own construction business. In 1998, or six years after he officially became an Indonesian citizen, Low acquired PT Gunungbayan Pratamacoal, a coal company with concessions spanning dozens of thousands of hectares in East Kalimantan, and PT Dermaga Perkasapratama, a coal terminal operator in the same province. Later in 2008, Haji Asri, the former owner of Gunungbayan, filed a lawsuit against Low, who was alleged to have not completed the entire payment for the acquisition. But, the judge found Low not guilty.<br><br>Moreover, tycoon Sukamto Sia also filed a lawsuit against Low in July 2008, a month before Low's PT Bayan Resources went public. According to Sukamto, Low promised to give 50% of the company's shares to Sukamto in exchange for a loan provided to Low to start his coal business in the mid-1990s. The case was taken to the Singaporean High Court, which later rejected Sukamto’s lawsuit in 2012 and even obliged Sukamto to pay 132.3 million in Singaporean dollar to Low in 2015 because he was deemed to have defamed Low, just before Bayan Resources was listed in the stock market.<br><br><p><span style='font-size:1.2rem'>Zodiac: Aries</span><p>Typically, an Aries is someone who is full of passion, fiery, in both their professions and romantic relationships alike. He is full of self-confidence and determination to make his brimming ambitions come true. He speaks bluntly, straightforwardly to the core of the problem. Understandably, he does not like people who beat around the bush. He is likely to just take an impulsive action and just think about the consequences later, and is undaunted by the prospect of doing dangerous things.",
  'imgcard':'card-low-tuck-kwong.png',
  'imgfight':'fight-low-tuck-kwong.png'
  },
  {
  'nama':'Luhut Binsar Pandjaitan',
  'init':0,
  'index':6,
  'zodiak':'Libra',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Toba Sejahtra',
  'card2':'<span class="strong">Extraction</span> : 5.5 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 14,019 hectares',
  'card4':'<span class="strong">Superpower</span> : Handling millions of problems simultaneously',
  'card5':"<span class='strong'>Jabatan</span> : Indonesia's National Military, Golkar political party",
  "artikel":"<p>Luhut Binsar Pandjaitan is nicknamed 'Lord' by Indonesian netizens as it seems that he's capable of handling everything. He is a true all-rounder.<p>When Luhut served as Coordinating Minister for Maritime Affairs in 2016, he was appointed the acting Energy and Mineral Resources Minister after Arcandra Tahar was sacked for holding dual citizenship. In 2020, during his time as Coordinating Minister for Maritime Affairs and Investment, Luhut also briefly served as the acting Maritime and Fisheries Affairs Minister after Edhy Prabowo was arrested by anti-graft officials. In the same year, he was appointed deputy chairman of the Covid-19 Mitigation and National Economic Recovery Task Force.<p>In addition, Luhut now serves as the chairman of the Domestic Production Utilization Optimization National Team, the chairman of the Proud of Indonesian Products National Movement, and even the chairman of the National Priority Lake Rescue team. All that has earned Luhut the title of “Coordinating Minister for All Affairs”.<p>Luhut has placed a number of his military acquaintances across his various companies. To name a few: Sumardi and former Religious Affairs minister Fachrul Razi in PT Toba Sejahtra's board of commissioners. Moreover, Sintong Pandjaitan serves as PT Adimitra Baratama Nusantara commissioner, while Suaidi Marasabessy serves as PT Trisensa Mineral Utama executive director and PT Kutai Energi director. The last three companies operate under Toba Sejahtra.<br><br><p><span style='font-size:1.2rem'>Close Relationship With President Joko Widodo</span><p>Luhut has been close to President Joko “Jokowi” Widodo since the latter still served as the mayor of Surakarta, Central Java. Back then, the two formed a joint venture called PT Rakabu Sejahtra. This company manufactures wood and exports its final products. Up until today, Luhut's Toba Sejahtra is still Rakabu Sejahtra's biggest shareholder.<p>No wonder Luhut resigned from the Golongan Karya (Golkar) party to support Jokowi during the 2014 presidential election. It was a significant move considering at that time, Luhut was serving as the chief of Golkar national leadership office's board of advisors. He made the right choice. Jokowi won and became the president. Since then, Luhut has been playing an important role in the government.<br><br><p><span style='font-size:1.2rem'>Zodiac: Libra</span><p>A Libra is typically a highly balanced person. He is diplomatic and is tactful in finding common grounds which can unite opposing parties. He has great social skills and is happy to hang out with all sorts of people. One of the negative traits possessed by a Libra is to indulge in self-pity and feel as if the world revolves around him. Therefore, when things do not go according to plan, he starts creating drama, under the delusion that everyone is conspiring to bring him down.",
  'imgcard':'card-luhut-binsar-pandjaitan.png',
  'imgfight':'fight-luhut-binsar-pandjaitan.png'
  },
  {
  'nama':'Prabowo Subianto',
  'init':0,
  'index':7,
  'zodiak':'Libra',
  'card1':'<span class="strong">Earth-crushing machine</span> : Nusantara Group',
  'card2':'<span class="strong">Extraction</span> : N/A',
  'card3':'<span class="strong">Coal concessions</span> : (At least) 62,753 ha (2019)',
  'card4':'<span class="strong">Superpower</span> : Chasing dreams while riding a horse',
  'card5':"<span class='strong'>Jabatan</span> : Indonesia's National Military, Gerindra political party",
  'artikel':"<p>As the son-in-law of former authoritarian president Soeharto, Prabowo Subianto was able to build a brilliant career in Indonesia's National Military. However, he was dismissed from his military duties in August 1998 as a consequence of his involvement in the abduction of prodemocracy activists about six months before. Afterward, Prabowo decided to live abroad, including in Jordan, Germany and Malaysia, before returning to Indonesia in 2000. He then started building his business empire and political power base, while pursuing his horse riding hobby.<p>Prabowo joined the Golongan Karya (Golkar) party's presidential candidate convention ahead of the 2004 presidential election, only to lose in the first round. He founded the Great Indonesian Movement (Gerindra) party in 2008 and became Megawati Soekarnoputri's running mate during the 2009 presidential election. They lost. Prabowo then ran for office as a presidential candidate two times, during the 2014 and 2019 presidential elections, with Hatta Rajasa and Sandiaga Uno as his running mates, respectively. He also lost in those rounds. Yet, President Joko Widodo still gave him his lot in the cabinet. He was appointed Defense Minister for the 2019-2024 period.<br><br><p><span style='font-size:1.2rem'>Zodiac: Libra</span><p>A Libra is typically a highly balanced person. He is diplomatic and is tactful in finding common grounds which can unite opposing parties. He has great social skills and is happy to hang out with all sorts of people. One of the negative traits possessed by a Libra is to indulge in self-pity and feel as if the world revolves around him. Therefore, when things do not go according to plan, he starts creating drama, under the delusion that everyone is conspiring to bring him down.",
  'imgcard':'card-prabowo-subianto.png',
  'imgfight':'fight-prabowo-subianto.png'
  },
  {
  'nama':'Sandiaga Uno',
  'init':0,
  'index':8,
  'zodiak':'Cancer',
  'card1':'<span class="strong">Earth-crushing machine</span> : PT Adaro Energy',
  'card2':'<span class="strong">Extraction</span> : 54.53 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 316,619 hectares',
  'card4':'<span class="strong">Superpower</span> : Going viral with silly acts',
  'card5':'<span class="strong">Jabatan</span> : Astra family, Gerindra political party',
  'artikel':"<p>Sandiaga Uno entered the public spotlight when he and Anies Baswedan were running for office in the 2017 Jakarta gubernatorial election. They won. Yet, after serving as Jakarta deputy governor for only a year, Sandiaga resigned from his position to become Prabowo Subianto's running mate in the 2019 presidential election. During the presidential campaign, Sandiaga often did meaningless, silly things that paved way for him to go viral on social media.<br><br><p><span style='font-size:1.2rem'>Business Networks</span><p>In 1998, Sandiaga joined hands with Edwin Soeryadjaya, a son of tycoon William Soeryadjaya, to develop investment company PT Saratoga Investama Sedaya. In 2002, Saratoga began investing in Adaro Group, which is currently led by Garibaldi “Boy” Thohir, the older brother of State-Owned Enterprises Minister Erick Thohir. As of 2020, Saratoga held direct and indirect shares totaling 58.46% in PT Adaro Energy (Adaro Group's coal holding company).<br><br><p><span style='font-size:1.2rem'>Roles in Cabinet and Gerindra Party</span><p>After Prabowo and Sandiaga lost in the 2019 presidential election, each got a slot in the cabinet. Prabowo has become Defense Minister since the end of 2019, while Sandiaga has served as the Tourism and Creative Economy Minister since the end of 2020.<p>Currently, Sandi also serves as the board of advisors' deputy chairman for the Great Indonesian Movement (Gerindra) Party, with Prabowo as the chairman.<br><br><p><span style='font-size:1.2rem'>Zodiac: Cancer</span><p>Just like the crab which is the icon of this zodiac, a cancer feels most comfortable when he is inside his own shell or home, or when socializing with the closest members of his own inner circle. There is a thick wall surrounding him, although deep inside he is an emotionally volatile and hypersensitive individual. He has an awkward sense of humor. He is highly loyal and protective, capable of doing just about anything to protect his family and best friends.",
  'imgcard':'card-sandiaga-uno.png',
  'imgfight':'fight-sandiaga-uno.png'
  },
  {
  'nama':'Erick Thohir',
  'init':0,
  'index':9,
  'zodiak':'Gemini',
  'card1':'<span class="strong">Earth-crushing machine</span> : Mining Industry Indonesia (MIND ID)',
  'card2':'<span class="strong">Extraction</span> : 25.15 million tons of coal (2020)',
  'card3':'<span class="strong">Coal concessions</span> : 109,985 hectares',
  'card4':'<span class="strong">Superpower</span> : Reshuffling state-owned enterprises’ board of directors',
  'card5':'<span class="strong">Jabatan</span> : The US Connection',
  'artikel':"<p>Since Erick Thohir was appointed State-Owned Enterprises Minister in 2019, he has overhauled the board of directors and commissioners of various SOEs, including Mining Industry Indonesia (MIND ID), a holding company for several state-backed mining firms.<p>In December 2021, for instance, Erick reshuffled the leadership of MIND ID and its subsidiary PT Timah. Hendi Prio Santoso replaced Orias Petrus Moedak as MIND ID president director. Furthermore, Achmad Ardianto was appointed Timah president director, replacing M. Riza Pahlevi Tabrani.<br><br><p><span style='font-size:1.2rem'>2018 Asian Games Success</span><p>Erick is a media tycoon and sports group investor. The media industry plays an important role in shaping and maintaining public opinion, while the sports scene offers a very large base of supporters. No wonder, after Eric successfully accomplished his duties as the committee chairman of the 2018 Asian Games, his name was catapulted into fame. After Joko Widodo won the 2019 presidential election, Erick was appointed SOEs Minister.<br><br><p><span style='font-size:1.2rem'>The US Connection</span><p>Erick attained a Master’s Degree in business administration in the United States in 1993. A year after this, upon his return to Indonesia, he founded the Mahaka Group together with three of his friends who, like him, went to study in the Uncle Sam’s country: Muhammad Lutfi, Wishnu Wardhana and Harry Zulnardy. Lutfi currently serves as Trade Minister. Erick is also a close friend of Arsjad Rasyid, another US-educated businessman. Wishnu and Arsjad now control coal holding company PT Indika Energy.<br><br><p><span style='font-size:1.2rem'>Zodiac: Gemini</span><p>A Gemini is typically bustling with a lust for life. He loves to socialize, sharing stories and gossip (don’t you ever tell him any of your secrets). No wonder, he often turns into the center of attention. He could easily adapt to new situations and loves to try new things. Fair to say, he is an impulsive character. It’s possible for him to lose his focus in the middle of doing something and all of a sudden make a haphazard decision. He’s intelligent, but sometimes he can be overly analytical, making him seem indecisive.",
  'imgcard':'card-erick-thohir.png',
  'imgfight':'fight-erick-thohir.png'
  }
]

selevel = 0 //level by choosing character
namechar.html(data[0].nama)
namechar.css('width', (r - 0.5 * rad))
namechar.css('text-transform','uppercase')

var angle = 360;
var divider = 10;

var svg = linkcontainer
  .append('svg')
  .attr('width',width)
  .attr('height', height);

var defs = svg
  .append('defs');

var clipPath = defs
  .selectAll('clipPath')
  .data(data)
  .join('clipPath')
  .attr('id', (d, i) => `circle-clip-${i}` )
  .append('circle')
  .attr('stroke', '#000000')
  .attr('cx', (d,i)=>{
    let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx
    return x;
  })
  .attr('cy',(d,i)=>{
    let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy
    return y;
  })
  .attr('r',rad)

var circus = svg
  .append('g')
  .selectAll('circle')
  .data(data)
  .join("circle")
  .attr('id', (d, i) => `chara-circle-${i}` )
  .attr('r',rad)
  .attr('cx', (d,i)=>{
    let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx
    return x;
  })
  .attr('cy',(d,i)=>{
    let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy
    return y;
  })
  .style('fill',(d,i)=> {
    let init = d.init
    if (init==0) {
      return '#101025'
    } else {
      return '#DE5341'
    }
  })
  .style('cursor',(d,i)=> {
    let init = d.init
    if (init==0) {
      return 'no-drop'
    } else {
      return 'pointer'
    }
  })

var graphic = svg
  .append('g')
  .selectAll('image')
  .data(data)
  .join("image")
  .attr('href', (d,i)=> {
    let init = d.init
    if (init==1) {
      return 'img/fight/' + d.imgfight
    }
  })
  .attr('width', 2*rad )
  .attr('height', 2*rad )
  .attr('x', (d,i)=>{
    let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx - rad
    return x;
  })
  .attr('y',(d,i)=>{
    let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy -rad
    return y;
  })
  .attr('style', (d, i) => `clip-path: url(#circle-clip-${i})`)
  .style('cursor',(d,i)=> {
      let init = d.init
      if (init==0) {
        return 'no-drop'
      } else {
        return 'pointer'
      }
    })
  .style('pointer-events',(d,i)=> {
    let init = d.init
    if (init==0) {
      return 'none'
    } else {
      return 'auto'
    }
  })
  .on('mouseover', (d,i)=> {
    let init = i.init
    let sel = i.index
    if (init == 1) {
      selevel = sel
      namechar.html(i.nama)
      d3
      .select(`#chara-circle-${sel}`)
      .transition()
      .duration(200)
      .style('fill','#CB1E58')
      .style('stroke','white')
      .style('stroke-width','3px')
    }
  })
  .on('mouseout', (d,i)=> {
    let init = i.init
    let sel = i.index
    if (init == 1) {
    circus
      .transition()
      .duration(200)
      .style('stroke','none')
      .style('fill',(d,i)=> {
    let init = d.init
    if (init==0) {
      return '#101025'
    } else {
      return '#DE5341'
    }
  })
    }
  })

var text = svg
  .append('g')
  .selectAll('text')
  .data(data)
  .join('text')
  .attr('x', (d,i)=>{
      let x = (r * Math.sin(Math.PI * 2 * (i * 36) / 360)) + cx - rad
      return x;
})
  .attr('y',(d,i)=>{
  let y = (r * Math.cos(Math.PI * 2 * (i * 36) / 360)) + cy -rad
  return y;
})
  .attr('dx',rad)
  .attr('dy',1.5*rad)
  .text((d,i)=> {
      let init = d.init
      if (init==0) {
        return '?'
      }
    })
  .style('fill', 'white')
  .attr('class','coda-font')
  .attr('text-anchor', 'middle')

window.addEventListener('resize',resize)

function selectData() {
  //change question array variable
    if (selevel == 0) {
      qlevel = quest1
    } else
      if (selevel == 1) {
      qlevel = quest2
    } else
      if (selevel == 2) {
      qlevel = quest3
    } else
      if (selevel == 3) {
      qlevel = quest4
    } else
      if (selevel == 4) {
      qlevel = quest5
    } else
      if (selevel == 5) {
      qlevel = quest6
    } else
      if (selevel == 6) {
      qlevel = quest7
    } else
      if (selevel == 7) {
      qlevel = quest8
    } else
      if (selevel == 8) {
      qlevel = quest9
    } else
      if (selevel == 9) {
      qlevel = quest10
    }
  
  return qlevel
}  //choose question data based on level

//click to go to fight page
fight.click(()=>{
    let qlevel = selectData()
    //console.log('level ' + qlevel)
    shuffle(qlevel)
    answerval = questGenerator(qlevel,0)
    enemyName.html(data[selevel].nama)
    let inputval = $('#fname').val()
    playerName.html(inputval)
    //console.log(inputval)

    enemy.attr('src', 'img/fight/' + data[selevel].imgfight)
  
    // reset life
    hr1.removeClass('disappear')
    hr2.removeClass('disappear')
    hl1.removeClass('disappear')
    hl2.removeClass('disappear')
  
    transition.css('display', 'block')
    setTimeout(() => {
      cardcontainer.css('display','none')
      cont4.css('display','none')
      cont5.css('display','block')
    }, 1000);
    setTimeout(wipeOut, 0)
    setTimeout(wipeIn, 1000)
    setTimeout(() => {
      transition.css('display','none')
    }, 2000);
  
  })

//click select character to show card
selaction.click(()=>{
  //console.log('card')
  //console.log(data[selevel])
  cardcontainer.css('display','flex')
  flipcard.addClass('flip-animation')
  
  nameCard.html(data[selevel].nama)
  zodiacCard.html(data[selevel].zodiak)
  zodiacimg.attr('src','img/zodiac/zodiac_'+data[selevel].zodiak+'.png')
  
  card1.html(data[selevel].card1)
  card2.html(data[selevel].card2)
  card3.html(data[selevel].card3)
  card4.html(data[selevel].card4)
  card5.html(data[selevel].card5)

  profile.attr('src','img/card/' + data[selevel].imgcard)
  
  articlecontent.html(data[selevel].artikel)
   
  d3.select('.card-container')
    .transition()
    .duration(500)
    .style('opacity',1)
  
  
})

//click more detail
detailbutton.click(() => {
  detailarticle.css('display','flex')
  articlecontent.scrollTop(0);
  d3.select('.article-container')
    .transition()
    .duration(500)
    .style('opacity',1)
})

//back to card
backarticle.click(() => {
  d3.select('.article-container')
    .transition()
    .duration(500)
    .style('opacity',0)
  setTimeout(()=> {
    detailarticle.css('display','none')
  },1000)
  
})

//back to character select
cardclose.click(() => {
  d3.select('.card-container')
    .transition()
    .duration(500)
    .style('opacity',0)
  setTimeout(()=> {
    cardcontainer.css('display','none')
  },1000)
  cont4.css('display','flex')
})

//FIGHT QUIZ
var answer1 = $('#a1');
var answer2 = $('#a2');
var submit  = $('.quiz-s');
var ansel,r,
    sel    = '00';
var chara1 = $('.chara-img-left');
var chara2 = $('.chara-img-right');
var q      = $('.quiz-q');
var plife  = 2;
var elife  = 2;
var hl1 = $('#hl1');
var hl2 = $('#hl2');
var hr1 = $('#hr1');
var hr2 = $('#hr2');
var questno = 0;
var hitleft = $('.hit-left');
var hitright= $('.hit-right');
var c1,c2,ca1,ca2;
var testChoice;

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//var testChoice = choiceShuffle() //tester

function choiceShuffle() {
  let rand = randomizer(2)
  if ( rand == 1 ) {
    return {
      'rand': 1,
      'ca1' : 'a',
      'ca2' : 'b'
    }
  } else
  if ( rand == 2 ) {
    return {
      'rand': 2,
      'ca1' : 'b',
      'ca2' : 'a'
    }
  }
} //tester

function questGenerator(question, number) {
  //variable
  testChoice = choiceShuffle()
  //console.log('first '+ number)
  
  sel='00'
  
  answer1.css('background-color', 'lightyellow')
  answer1.css('color', 'black')
  answer2.css('background-color', 'lightyellow')
  answer2.css('color', 'black')
  
  //generate question
  q.html(question[number].q)
  
  //choice randomizer

  c1 = question[number].a
  c2 = question[number].b
 
  //print choices
  answer1.html(c1)
  answer2.html(c2)
  
  ca1=testChoice.ca1
  ca2=testChoice.ca2
  
  //console.log('function' + 'ca1 '+ca1+' ca2 '+ca2)
  
} //generate question

submit.click(()=> {//answer
  //console.log('click' + 'ca1 '+ca1+' ca2 '+ca2)
  //correct answer
  //console.log('question number ' + questno)
  //console.log('answer ' + qlevel[questno].ans)
  ansel = qlevel[questno].ans
  questno++
  
  //check both life
  if (plife>0 && elife>0) {
    //check if answer selected
    if(sel=='00') {
      //jawaban belum dipilih sama sekali, tidak ada pilihan berwarna hijau
      alert('Choose your answer!')
    } else
    if (sel!='00') {
    //selection checker
      if (sel=='ca1') {
        //pilihan ca1 -- atas
        //sel sama dengan 
        sel='a'
      } else
      if (sel == 'ca2') {
        //pilihan ca2 -- bawah
        sel='b'
      }
    

    //correct answer checker
    if(ansel==sel) { // if correct
      //console.log('correct')
      addAnimation(chara2)
      hitright.css('opacity',1)
      addHitAnimation(hitright)
      //console.log(elife)
      //life reducer
      if (elife==2) {
        hr2.addClass('disappear')
        elife--
        questGenerator(qlevel,questno)
      } else
      if (elife==1) {
        //if win`
        //if level < 9
        if (level < 9) {
            //show next level card
            hr1.addClass('disappear')
            
            setTimeout(()=> { //show win
            winlose.css('display','flex')
            winimg.addClass('winlosetransition')
            winimg.attr('src','img/menang.png')
            },1000)
            
            setTimeout(()=> { //remove win
            winimg.removeClass('winlosetransition')
            winlose.css('display','none')
            },3200)
            
            //reset all status
            plife = 2
            elife = 2
            questno = 0
            
            //push level
            selevel++
            pushLevel()
            
            //show card
            setTimeout(()=> {
            cardcontainer.css('display','flex')
            flipcard.addClass('flip-animation')

            nameCard.html(data[selevel].nama)
            zodiacCard.html(data[selevel].zodiak)
            zodiacimg.attr('src','img/zodiac/zodiac_'+data[selevel].zodiak+'.png')

            card1.html(data[selevel].card1)
            card2.html(data[selevel].card2)
            card3.html(data[selevel].card3)
            card4.html(data[selevel].card4)
            card5.html(data[selevel].card5)

            profile.attr('src','img/card/' + data[selevel].imgcard)

            articlecontent.html(data[selevel].artikel)

            cont5.css('display','none')

            d3.select('.card-container')
                .transition()
                .duration(500)
                .style('opacity',1)
            },3500)  
        } else
        // if level 9
        if  (level == 9) {
            hr1.addClass('disappear')
            
            setTimeout(()=> { //show win
            winlose.css('display','flex')
            winimg.addClass('winlosetransition')
            winimg.attr('src','img/menang.png')
            },1000)
            
            setTimeout(()=> { //remove win
            winimg.removeClass('winlosetransition')
            winlose.css('display','none')
            },3200)
            
            //reset all status
            plife = 2
            elife = 2
            questno = 0

            //show epilog
            setTimeout(()=> {
                transition.css('display', 'block')
            },3500)            
            setTimeout(() => {
                cont5.css('display','none')
                cont6.css('display','flex')
            }, 4500);
            setTimeout(wipeOut, 3500)
            setTimeout(wipeIn, 4500)
            setTimeout(() => {
                transition.css('display','none')
            }, 5500);
        }
                    
        }
      
    } else
      if(ansel!=sel) { // if wrong
      //console.log('wrong')
      addAnimation(chara1)
      hitleft.css('opacity',1)
      addHitAnimation(hitleft)
      //console.log(plife)
      //life reducer
      if (plife==2) {
        hl2.addClass('disappear')
        plife--
        questGenerator(qlevel,questno)
      } else
      if (plife==1) {
        hl1.addClass('disappear')
        
        setTimeout(()=> { //show win
          winlose.css('display','flex')
          winimg.addClass('winlosetransition')
          winimg.attr('src','img/kalah.png')
        },1000)
        
        setTimeout(()=> { //remove win
          winimg.removeClass('winlosetransition')
          winlose.css('display','none')
        },3200)
        
        // reset all status
        plife = 2
        elife = 2
        questno = 0
        
        //back to link page container
        updateLink()
        setTimeout(()=>{ //1500 ms (750ms after hit animation)
            cont4.css('display','flex')
            cont5.css('display','none')
        },3500)
        
        
      }
    } 

    setTimeout(removeAnimation, 1750)
    }
  }    
}) //check answer

//kembali ke link page
backreset.click(()=>{
    updateLink()
    transition.css('display', 'block')
    setTimeout(() => {
        cont6.css('display','none')
        cont4.css('display','flex')
    }, 1000);
    setTimeout(wipeOut, 0)
    setTimeout(wipeIn, 1000)
    setTimeout(() => {
        transition.css('display','none')
    }, 2000);

})

answer1.click(()=> {
  sel = 'ca1'
  toggleButton(answer1, answer2)
  //console.log(sel)
}) //click option A answer

answer2.click(()=> {
  sel = 'ca2'
  toggleButton(answer2, answer1)
  //console.log(sel)
}) //click option B answer

function toggleButton(a,b) {
  a.css('background-color', 'green')
  a.css('color', 'white')
  b.css('background-color', 'lightyellow')
  b.css('color', 'black')
}

function addAnimation(a) {
  a.addClass('chara-shaker')  
}

function addHitAnimation(a) {
  a.addClass('hit-shaker')  
}

function removeAnimation() {
  chara1.removeClass('chara-shaker')  
  chara2.removeClass('chara-shaker')  
  hitleft.removeClass('hit-shaker')
  hitright.removeClass('hit-shaker')
  hitleft.css('opacity', 0)
  hitright.css('opacity', 0)
}

function randomizer(multiplier) {
  let m = multiplier - 0.5
  r = Math.floor((Math.random() * m) + 1)
  return r
} //answer randomizer

//FULL SCREEN
var fullscreen = $('.full-btn')
var fullscreen2= $('#full')
var fullexit   = $('#full-exit')
var game = document.documentElement

fullscreen.click(()=> {
  openFullscreen(game)
})

fullscreen2.click(()=> {
  openFullscreen(game)
})

fullexit.click(()=> {
  closeFullscreen()
})

/* Function to open fullscreen mode */
function openFullscreen(elem) {
  fullexit.css('display','block')
  fullscreen2.css('display','none')
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  fullexit.css('display','none')
  fullscreen2.css('display','block')
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
