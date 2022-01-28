var go   =  $('.play-btn')
var go2  =  $('.input-btn')
var cont1=  $('.title-container')
var cont2=  $('.input-container')
var cont3=  $('.intro-container')
var cont4=  $('.link-container')
var cont5=  $('.fight-container')
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

//question
//Aburizal Bakrie
var quest1 = [
  {
    'q':'Siapa produsen batubara terbesar di Indonesia?',
    'a':'PT Kaltim Prima Coal',
    'b':'PT Bukit Asam',
    'ans':'a'
  },
  {
    'q':'Siapa pemilik PT Kaltim Prima Coal, produsen batubara terbesar di Indonesia?',
    'a':"Adika Nuraga Bakrie (Anak Aburizal Bakrie)",
    'b':"Boy Thohir (Saudara Erick Thohir)",
    'ans':'a'
  },
  {
    'q':'Induk perusahaan batubara terbesar di Indonesia yang memproduksi 81,1juta ton tahun 2020 adalah...',
    'a':'PT Bumi Resources',
    'b':'PT Sinar Mas',
    'ans':'a'
  },
  {
    'q':'Berikut ini adalah anak usaha PT Bumi Resources, kecuali...',
    'a':'PT Dian Swastika, PT Agung Sentosa, & PT Karya Anak Bangsa',
    'b':'PT Kaltim Prima Coal, PT Arutnim Indonesia, & PT Pendopo Energi Batubara',
    'ans':'b'
  }
]
//Agus Lasmono
var quest2 = [
  {
    'q':'PT Indika Energy memiliki lahan batubara di Kalimantan Timur dan Kalimantan Tengah yang luasnya lebih dari luas ibu kota Jakarta.',
    'a':'Benar',
    'b':'Salah',
    'ans':'a'
  },
  {
    'q':'Siapa pemilik PT Indika Energy yang memproduksi 34,3 juta ton batubara pada 2020?',
    'a':'Agus Lasmono',
    'b':'Agus Magelangan',
    'ans':'a'
  },
  {
    'q':'Berapa jumlah produksi batubara PT Indika Energy milik Agung Lasmono pada tahun 2020?',
    'a':'43,3 juta ton',
    'b':'34,3 juta ton',
    'ans':'b'
  }
]
//Edwin Soeryadjaya
var quest3 = [
  {
    'q':'Pada akhir 2020, Edwin memiliki 65,82% saham langsung dan tidak langsung di Saratoga dan memiliki 3,29% saham di Adaro Energy.',
    'a':'Salah',
    'b':'Benar',
    'ans':'b'
  },
  {
    'q':'Indonesia diperkirakan kehilangan pemasukan pajak 125 juta dolar AS tahun 2009-2017, karena Adaro Energy diduga memindahkan keuntungan ke anak perusahaan di luar negeri.',
    'a':'Salah',
    'b':'Benar',
    'ans':'b'
  },
  {
    'q':'Lahan PT Adaro Energy ada di beberapa daerah ini kecuali..',
    'a':'Sumatera Utara & Bengkulu',
    'b':'Queensland Australia & Sumatera Selatan',
    'ans':'b'
  }
]
//Fuganto Widjaja
var quest4 = [
  {
    'q':'Berapa jumlah produksi batubara Sinar Mas Mining Group 2020?',
    'a':'60 juta ton',
    'b':'50 juta ton',
    'ans':'a'
  },
  {
    'q':'Siapa bos Sinar Mas Mining Group yang memiliki luas area produksi mencapai 278.802,8 hektar?',
    'a':'Sandiaga Uno',
    'b':'Fuganto Widjaja',
    'ans':'b'
  },
  {
    'q':'Berapa luas area operasi tambang batubara milik Sinar Mas Mining Group?',
    'a':'278.802 ha',
    'b':'316.619 ha',
    'ans':'a'
  }
]
//Garibaldi "Boy" Thohir
var quest5 = [
  {
    'q':'Berapa persen kepemilikan saham Boy Thohir di Adaro Energy?',
    'a':'43,91%',
    'b':'6,18%',
    'ans':'b'
  },
  {
    'q':'Erick Thohir adalah saudara kandung Boy Thohir, bos batubara Adaro Energy.',
    'a':'Benar',
    'b':'Salah',
    'ans':'a'
  },
  {
    'q':'Sebelum berganti nama menjadi PT Adaro Energy, apa nama perusahaan batubara milik Boy Thohir?',
    'a':'PT Padang Karunia',
    'b':'PT Mencari Cinta Sejati',
    'ans':'a'
  }
]
//Low Tuck Kwong
var quest6 = [
  {
    'q':'Siapa pemilik PT Bayan Resources yang memiliki 126.293 ha lahan batubara di Kalimantan Timur dan Kalimantan Selatan?',
    'a':'Aburizal Bakrie',
    'b':'Low Tuck Kwong',
    'ans':'b'
  },
  {
    'q':'Berapa jumlah produksi batubara PT Bayan Resources milik Low Tuck Kwong pada 2020?',
    'a':'34,3 juta ton',
    'b':'30,2 juta ton',
    'ans':'b'
  },
  {
    'q':'Berapa persen kepemilikan saham Low Tuck Kwong di Bayan Resources?',
    'a':'29,03%',
    'b':'55,2%',
    'ans':'b'
  }
]
//Luhut Binsar Pandjaitan
var quest7 = [
  {
    'q':'Luhut Binsar Pandjaitan memiliki bisnis batubara.',
    'a':'Benar',
    'b':'Salah',
    'ans':'a'
  },
  {
    'q':'Apa nama perusahaan Luhut Binsar Pandjaitan yang bergerak di bidang tambang batubara?',
    'a':'PT Toba Sejahtera',
    'b':'PT TBS Energi Utama',
    'ans':'b'
  },
  {
    'q':'Berapa luas lahan batubara milik Luhut Binsar Pandjaitan di Kalimantan Timur?',
    'a':'7.087 ha',
    'b':'76.120 ha',
    'ans':'a'
  },
  {
    'q':'Laksamana Marsetio, mantan kepala staf TNI Angkatan Laut adalah wakil komisaris utama PT Berau Coal Energy, anak perusahaan Sinar Mas.',
    'a':'Benar',
    'b':'Salah',
    'ans':'a'
  }
]
//Prabowo Subianto
var quest8 = [
  {
    'q':'Berapa luas lahan batubara di Kalimantan Timur yang dimiliki Prabowo lewat Grup Nusantara?',
    'a':'62.753 ha',
    'b':'278.802 ha',
    'ans':'a'
  },
  {
    'q':'Apa zodiak Prabowo Subianto?',
    'a':'Libra',
    'b':'Gemini',
    'ans':'a'
  },
  {
    'q':'Sandiaga Uno pernah maju menjadi calon wakil presiden mendampingi Prabowo Subianto sebagai calon presiden pada Pilpres 2019.',
    'a':'Benar',
    'b':'Salah',
    'ans':'a'
  }
]
//Sandiaga Uno
var quest9 = [
  {
    'q':'Berapa luas area operasi tambang batubara milik PT Adaro Energy?',
    'a':'278.802 ha',
    'b':'316.619 ha',
    'ans':'b'
  },
  {
    'q':'Pada tahun 2020 Sandiaga Uno memiliki saham sebesar 21,51 persen di Saratoga, sebuah perusahaan yang memegang 58,46 persen saham di PT Adaro Energi.',
    'a':'Benar',
    'b':'Salah',
    'ans':'a'
  },
  {
    'q':'Tahun berapa Saratoga (perusahaan milik Sandiaga Uno) berinvestasi ke Grup Adaro yang kini menjadi induk usaha batubara terbesar ketiga di Indonesia?',
    'a':'2002',
    'b':'1991',
    'ans':'a'
  }
]
//Erick Thohir
var quest10 = [
  {
    'q':'Selain memiliki relasi bisnis batubara lewat kakaknya, Boy Thohir, Erick Thohir juga dikenal sebagai pengusaha di bidang...',
    'a':'Media & Olahraga',
    'b':'Rokok & Kayu',
    'ans':'a'
  },
  {
    'q':'MIND ID merupakan bisnis BUMN di bidang batubara yang memiliki lahan batubara seluas 109.985 ha di Sumsel, Sumbar, Riau, Jambi, Kaltim, dan Kalsel.',
    'a':'Salah',
    'b':'Benar',
    'ans':'b'
  },
  {
    'q':'Erick Thohir merupakan anggota dari ormas apa?',
    'a':'Banser',
    'b':'Densus',
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
    alert('Nama belum diisi')
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
    console.log(d,i)
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
    console.log(d,i)
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
  'card1':'<span class="strong">Mesin tempur</span> : PT Bumi Resources',
  'card2':'<span class="strong">Daya keruk</span> : 81,1 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 136.985 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Berenang mengarungi utang',
  'card5':'<span class="strong">Afiliasi kekuasaan</span> : Partai Golkar',
  'artikel':"<p>Harga saham PT Bumi Resources tercatat hanya Rp67 pada akhir Desember 2021. Padahal, ia sempat menyentuh Rp8.750 pada Juni 2008. Ini karena utang perusahaan menggunung, hingga keluarga Bakrie mesti <a style='color:#CB1E58' href='https://www.cnbcindonesia.com/market/20180919140338-17-33828/begini-cerita-keluarga-bakrie-kehilangan-kendali-di-bumi' target='_blank'>melepas sahamnya</a> pada para kreditur. Ini bagai déjà vu, karena Grup Bakrie juga sempat terlilit utang miliaran dolar AS gara-gara krisis keuangan Asia 1997. Saat itu, Ical dan keluarga terpaksa melepas sebagian besar sahamnya di PT Bakrie & Brothers, hingga porsi kepemilikan mereka menciut dari 55% jadi <a style='color:#CB1E58' href='https://industri.kontan.co.id/news/kisah-grup-bakrie-lalui-krisis-demi-krisis' target='_blank'>hanya 2,5%</a>. <br><br><p><span style='font-size:1.2rem'>Partai Golkar</span><p>Tak mungkin membahas Ical tanpa menyentuh Partai Golongan Karya (Golkar). Bakrie sempat jadi ketua umum Golkar periode 2014-2019 dan kini jadi ketua dewan pembina periode 2019-2024. Sejumlah kader partai tersebut menempati posisi strategis di pemerintahan sembari menjaga jaringan bisnis batubaranya.<br><br><p><span style='font-size:1.2rem'>Scorpio</span><p>Bagai scorpion atau kalajengking, ada kesan 'berbahaya' yang dibawa seorang skorpio, entah karena gairah, intensitas, atau gayanya yang penuh misteri. Ia menutup diri dan kehidupan pribadinya rapat-rapat serta menyukai tantangan, bahaya, dan kegelapan. Ia menunggu dengan sabar dan menyerang di saat-saat tak terduga.",
  'imgcard':'card-aburizal-bakrie.png',
  'imgfight':'fight-aburizal-bakrie.png'
  },
  {
  'nama':'Agus Lasmono',
  'init':0,
  'index':1,
  'zodiak':'Aries',
  'card1':'<span class="strong">Mesin tempur</span> : PT Indika Energy',
  'card2':'<span class="strong">Daya keruk</span> : 34,3 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 76.120 ha (Kaltim, Kalteng, & Sumsel)',
  'card4':'<span class="strong">Jurus andalan</span> : Membangkitkan bisnis sekarat',
  'card5':'<span class="strong">Afiliasi kekuasaan</span> : Tidak diketahui',
  'artikel':"<p>Krisis moneter 1998 merobohkan kerajaan bisnis Sudwikatmono, sepupu Presiden Soeharto. Bank Surya dan Bank Subentra miliknya ambruk, ia terpaksa melepas kepemilikan sinepleks 21 kepada rekan bisnisnya. Ia lantas meleburkan sejumlah usahanya yang nyaris bangkrut ke Grup Indika, yang bangun Agus, anaknya, bersama Arsjad Rasjid pada tahun 1995. Lewat ini Indika inilah Agus memimpin kebangkitan bisnis keluarganya. Indika semula bergerak di bidang multimedia dan informatika, namun kemudian melebarkan sayap ke bisnis batubara setelah PT Indika Energy mengambil alih PT Kideco Jaya Agung pada 2004. Pada tahun 2012 Indika Energy mengambil alih dua perusahaan batubara lainnya, yakni PT Multi Tambangjaya Utama dan PT Mitra Energi Agung. <br><br><p><span style='font-size:1.2rem'>Kawannya Erick Thohir (Menteri BUMN) dan memiliki kerabat TNI yang terkoneksi dengan Prabowo Subianto (Menhan) dan partai Golkar</span><p>Sebagai bagian jejaring keluarga cendana, keluarga Agus terkoneksi dengan jaringan politik lama. Kakaknya, Tri Hanurita adalah politisi Golkar yang sempat menjadi anggota Komisi VII  DPR RI, komisi yang menangani masalah energi dan sumber daya mineral. Suami Tri adalah Mayor Jenderal TNI (Purn.) Dessano Indrasakti, staf ahli bidang ekonomi Menteri Pertahanan Prabowo Subianto yang juga memiliki bisnis batubaranya sendiri. Prabowo adalah mantan suami Siti Hediati Hariyadi, anak presiden Soeharto.<br><br><p><span style='font-size:1.2rem'>Aries</span><p>Seorang Aries biasanya penuh semangat, berapi-api, entah saat bekerja atau menjalin hubungan. Ia percaya diri dan penuh determinasi untuk mewujudkan segudang ambisi. Gayanya blak-blakan dan langsung ke inti persoalan. Karena itu, ia tak senang dengan sikap bertele-tele. Ia bisa saja beraksi dulu, berpikir kemudian, dan tak khawatir bila mesti melakukan hal-hal berbahaya.",
  'imgcard':'card-agus-lasmono.png',
  'imgfight':'fight-agus-lasmono.png'
  },
  {
  'nama':'Edwin Soeryadjaya',
  'init':0,
  'index':2,
  'zodiak':'Cancer',
  'card1':'<span class="strong">Mesin tempur</span> : PT Adaro Energy',
  'card2':'<span class="strong">Daya keruk</span> : 54,53 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 316.619 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Kartu reverse (membalik keadaan dari penuh utang jadi senang-senang)',
  'card5':'<span class="strong">Afiliasi kekuasaan</span> : Teman bisnis Sandiaga Uno',
  'artikel':"<p>Edwin merupakan anak dari William Soeryadjaya, konglomerat yang mendirikan grup Astra dengan PT Astra Internasional sebagai induknya. Pada tahun 1992 bisnis keluarga itu nyaris ambruk gara-gara bank Summa milik Edward, kakak Edwin, terjerat kredit macet. Sampai-sampai William menjual sahamnya di Astra untuk melunasi kewajiban bank Summa pada nasabah. Di saat bisnis keluarga sedang kesulitan, Edwin bertemu dengan Sandiaga Uno, lalu mengembangkan perusahaan investasi PT Saratoga Investama Sedaya. Saratoga pun menanamkan uang di PT Adaro Energy. Per 2020, kepemilikan Saratoga di PT Adaro Energy–induk usaha batubara Grup Adaro–tercatat menyentuh 58,46%, baik secara langsung maupun tak langsung. Pada akhir 2020, Edwin memiliki 65,82% saham langsung dan tidak langsung serta menjabat sebagai komisaris utama di Saratoga yang mengontrol Adaro Energy. Edwin pun memiliki 3,29% saham langsung dan jadi komisaris utama di Adaro Energy.<br><br><p><span style='font-size:1.2rem'>Teman bisnis Sandiaga Uno dan Boy Thohir</span><p>Edwin berteman baik dengan Sandi. Sandi berteman baik dengan Erick Thohir. Edwin memiliki 3,29% saham langsung dan jadi komisaris utama di Adaro Energy yang didirikan Boy Thohir, kakak kandung Erick Thohir. Saratoga pun memiliki saham di Adaro Energy mencapai 58,46%, baik secara langsung maupun tak langsung. Pertalian pertemanan, relasi bisnis, dan kekuasaan saling bertaut dalam relasi mereka.<br><br><p><span style='font-size:1.2rem'>Cancer</span><p>Seperti kepiting yang jadi simbol zodiak ini, seorang kanser merasa paling nyaman saat berada di cangkang atau rumahnya sendiri, atau saat berkumpul bersama orang-orang terdekatnya. Ada lapisan tebal yang membungkus dirinya, meski di dalam ia adalah pribadi yang penuh emosi dan kadang kelewat sensitif. Ia punya selera humor canggung. Ia sangat loyal dan protektif, sehingga bisa melakukan apa saja untuk melindungi keluarga dan para sahabatnya.",
  'imgcard':'card-edwin-suryadjaya.png',
  'imgfight':'fight-edwin-suryadjaya.png'
  },
  {
  'nama':'Fuganto Widjaja',
  'init':0,
  'index':3,
  'zodiak':'Scorpio',
  'card1':'<span class="strong">Mesin tempur</span> : Sinar Mas Mining Group',
  'card2':'<span class="strong">Daya keruk</span> : 60 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 278.802,8 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Mode siluman (bikin susah dilacak di Google)',
  'card5':'<span class="strong">Afiliasi kekuasaan</span> : Menggandeng TNI di lingkaran bisnis',
  'artikel':"<p>Selain menjadi CEO Grup Sinar Mas Mining, Fuganto memegang posisi penting di sejumlah perusahaan dalam grup. Ia adalah chairman eksekutif Golden Energy and Resources Limited, komisaris utama PT Roundhill Capital Indonesia, serta komisaris PT Golden Energy Mines dan PT Borneo Indobara. Ia juga sempat menjadi direktur utama PT Berau Coal Energy sejak Agustus 2015 hingga Juni 2021.<br><br><p><span style='font-size:1.2rem'>Menggandeng TNI di lingkaran bisnis</span><p>Suwandi, salah seorang kepercayaan Fuganto diberi jabatan direktur utama PT Berau Coal Energy dan PT Borneo Indobara. Suwandi lama berkarier di TNI Angkatan Darat dengan pangkat terakhir Mayor Jenderal. Sementara itu Marsetio, wakil komisaris utama PT Berau Coal Energy, adalah kepala staf TNI Angkatan Laut periode 2012-2015 dengan pangkat terakhir Laksamana. Marsetio saat ini adalah penasihat khusus bidang pertahanan dan keamanan Menteri Koordinator Bidang Kemaritiman dan Investasi Luhut Binsar Pandjaitan.<br><br><p><span style='font-size:1.2rem'>Scorpio</span><p>Bagai scorpion atau kalajengking, ada kesan 'berbahaya' yang dibawa seorang skorpio, entah karena gairah, intensitas, atau gayanya yang penuh misteri. Ia menutup diri dan kehidupan pribadinya rapat-rapat serta menyukai tantangan, bahaya, dan kegelapan. Ia menunggu dengan sabar dan menyerang di saat-saat tak terduga.",
  'imgcard':'card-fuganto-widjaja.png',
  'imgfight':'fight-fuganto-widjaja.png'
  },
  {
  'nama':'Garibaldi "Boy" Thohir',
  'init':0,
  'index':4,
  'zodiak':'Taurus',
  'card1':'<span class="strong">Mesin tempur</span> : PT Adaro Energy',
  'card2':'<span class="strong">Daya keruk</span> : 54,53 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 316.619 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Membangun jaringan strategis di lingkaran konglomerat & penguasa',
  'card5':'<span class="strong">Afiliasi kekuasaan</span> : Saudaranya Erick Thohir (Menteri BUMN)',
  'artikel':"<p>Selain lingkaran pertemanan yang saling bertaut dengan kepentingan bisnis, Boy juga membangun jaringan dengan elite penguasa. Ia akrab dengan A.M. Hendropriyono, mantan kepala Badan Intelijen Negara yang dekat dengan Ketua Umum Partai Demokrasi Indonesia Perjuangan (PDIP) Megawati Soekarnoputri. Hendropriyono sempat menjadi komisaris utama PT Merdeka Copper Gold, yang dimiliki pula oleh Saratoga dan Boy. <p>Saat ini Boy tercatat sebagai komisaris utama di Bhumi Rantau Energi milik Grup Hasnur dan komisaris independen PT Aplikasi Karya Anak Bangsa alias Gojek, yang didirikan Menteri Pendidikan, Kebudayaan, Riset dan Teknologi Nadiem Makarim.<br><br><p><span style='font-size:1.2rem'>Saudaranya Erick Thohir (Menteri BUMN)</span><p>Boy Thohir merupakan kakak dari Menteri BUMN Erick Thohir yang mengontrol Mining Industry Indonesia (MIND ID), induk bagi sejumlah perusahaan tambang milik pemerintah. Penambang batubara utama di bawah MIND ID adalah PT Bukit Asam. Selain itu, PT Timah dan PT Aneka Tambang juga memiliki usaha batubara berskala relatif kecil. Total, produksi batubara MIND ID mencapai 25,15 juta ton pada 2020.<br><br><p><span style='font-size:1.2rem'>Taurus</span><p>Seorang Taurus adalah pekerja keras yang berdedikasi dan, sering kali, keras kepala, seperti karakter banteng yang jadi simbol zodiak ini. Ia berhasrat mencapai hal-hal besar dan tak takut melakukan apa saja demi bisa memuluskan rencananya. Ia mencintai stabilitas dan menghargai kejujuran. Karena itu, sulit baginya memaafkan mereka yang ketahuan menipu atau memperdayanya.",
  'imgcard':'card-garibaldi-boy-thohir.png',
  'imgfight':'fight-garibaldi-boy-thohir.png'
  },
  {
  'nama':'Low Tuck Kwong',
  'init':0,
  'index':5,
  'zodiak':'Aries',
  'card1':'<span class="strong">Mesin tempur</span> : PT Bayan Resources',
  'card2':'<span class="strong">Daya keruk</span> : 30,2 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 126.293 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Berkelit dari gugatan',
  'card5':'<span class="strong">Afiliasi kekuasaan</span> : Tidak diketahui',
  'artikel':"<p>Low Tuck Kwong adalah pengusaha asal Singapura yang kemudian beralih kewarganegaraan Indonesia pada tahun 90an. Ia memulai kerajaannya dari bisnis kontraktor pada tahun 1973, sebelum akhirnya merambah ke bisnis batubara pada 1988. Di tengah krisis moneter, ia melakukan ekspansi dengan mengakuisisi PT Gunungbayan Pratamacoal, yang menguasai konsesi batubara puluhan ribu hektar di Kalimantan Timur dan PT Dermaga Perkasapratama, operator batubara di provinsi yang sama. Pada tahun 2008, akuisisi PT Gunungbayan berujung gugatan dari Haji Asri, karena dianggap akuisisi itu penuh tekanan dan belum dibayar lunas. Namun hakim memutus Low tak bersalah.<p>Low juga lolos dari gugatan yang dilayangkan Taipan Sukamto Sia pada Juli 2008, sebulan sebelum Bayan Resources mencatatkan saham di Bursa Efek Indonesia. Menurut Sukamto, Low pernah berjanji memberikan 50% saham Bayan Resources untuk membalas jasa Sukamto yang meminjamkan uang kepada Low untuk memulai bisnis batubaranya di pertengahan 1990an. Kasus ini dibawa ke Pengadilan Tinggi Singapura, yang kemudian menolak gugatan Sukamto pada 2012 dan bahkan mewajibkan Sukamto membayar 132,3 juta dolar Singapura kepada Low pada 2015 karena dianggap telah melakukan pencemaran nama baik sesaat sebelum Bayan Resources melantai di bursa.<br><br><p><span style='font-size:1.2rem'>Aries</span><p>Seorang Aries biasanya penuh semangat, berapi-api, entah saat bekerja atau menjalin hubungan. Ia percaya diri dan penuh determinasi untuk mewujudkan segudang ambisi. Gayanya blak-blakan dan langsung ke inti persoalan. Karena itu, ia tak senang dengan sikap bertele-tele. Ia bisa saja beraksi dulu, berpikir kemudian, dan tak khawatir bila mesti melakukan hal-hal berbahaya.",
  'imgcard':'card-low-tuck-kwong.png',
  'imgfight':'fight-low-tuck-kwong.png'
  },
  {
  'nama':'Luhut Binsar Pandjaitan',
  'init':0,
  'index':6,
  'zodiak':'Libra',
  'card1':'<span class="strong">Mesin tempur</span> : PT Toba Sejahtra',
  'card2':'<span class="strong">Daya keruk</span> : 5,5 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 14.019 ha (Kaltim)',
  'card4':'<span class="strong">Jurus andalan</span> : Menangani sejuta urusan pada waktu bersamaan',
  'card5':'<span class="strong">Jabatan</span> : Menteri Koordinator bidang Kemaritiman & Investasi',
  'artikel':"<p>Luhut mendapat julukan lord oleh netizen Indonesia sebagai satire karena sepertinya segala hal di Indonesia bisa diatur oleh Luhut. Luhut memang menteri segala bisa. Saat ia menjabat sebagai Menteri Koordinator Bidang Kemaritiman pada 2016, ia sempat juga menjadi Plt. Menteri ESDM menggantikan Arcandra yang ternyata memiliki kewarganegaraan ganda.  Pada tahun 2020 ketika ia menjabat sebagai Menteri Koordinator Bidang Kemaritiman dan Investasi, ia juga sempat menjadi Plt. Menteri KKP gara-gara Edhy Prabowo diciduk KPK. Pada saat yang sama ia juga diberi mandat menjadi Wakil Ketua Komite Penanganan Covid-19 dan Pemulihan Ekonomi Nasional sekaligus koordinator PPKM Jawa-Bali.<p>Selain itu, Luhut sekarang menjabat ketua Tim Nasional Peningkatan Penggunaan Produksi Dalam Negeri, ketua Gerakan Nasional Bangga Buatan Indonesia, dan bahkan ketua Dewan Pengarah Tim Penyelamatan Danau Prioritas Nasional. Itu semua bikin Luhut dikenal sebagai 'menteri segala urusan'. <p>Untuk urusan bisnis ia menggunakan jaringan militernya di berbagai perusahaannya. Misal, ada Sumardi dan mantan Menteri Agama Fachrul Razi di dewan komisaris Toba Sejahtra. Ada Sintong Pandjaitan sebagai komisaris PT Adimitra Baratama Nusantara, serta Suaidi Marasabessy sebagai direktur utama PT Trisensa Mineral Utama dan direktur PT Kutai Energi. Tiga perusahaan itu ada di bawah Toba Sejahtra.<br><br><p><span style='font-size:1.2rem'>Menteri Koordinator bidang Kemaritiman dan Investasi</span><p>Sebelum Luhut menjadi menteri, ia sudah lebih dulu dekat dengan Jokowi. Saat itu Jokowi masih menjabat sebagai wali kota Surakarta. Mereka berdua mendirikan usaha bersama dengan bendera PT Rakabu Sejahtra yang bergerak di bidang pengolahan kayu dan ekspor hasil jadinya. Ketika Pilpres 2014, Luhut mundur dari partai Golkar untuk mendukung Jokowi menjadi calon presiden. Pilihannya tepat, Jokowi menang dan Luhut pun mendapat tempat di pemerintah yang memungkinnya memainkan peran penting. Sejumlah jabatan yang pernah ia pegang yakni Kepala Staf Kepresidenan pada 2014, lalu menjadi Menteri Koordinator Bidang Politik, Hukum, dan Keamanan pada 2015, lalu digeser menjadi Menteri Koordinator Bidang Kemaritiman pada 2016. Setelah Pilpres 2019, Luhut kembali mendapat posisi penting yakni menjadi Menteri Koordinator Bidang Kemaritiman dan Investasi. <br><br><p><span style='font-size:1.2rem'>Libra</span><p>Seorang Libra biasanya penuh keseimbangan. Ia diplomatis dan lihai mencari titik temu yang bisa menyatukan pihak-pihak yang berseteru. Ia pandai bergaul dan senang berkumpul bersama siapa saja. Salah satu kebiasaan buruk seorang Libra adalah gemar mengasihani diri sendiri dan merasa dunia berputar di sekelilingnya. Maka, saat sesuatu berjalan tak sesuai rencana, ia bisa jadi begitu dramatis dan menganggap semua sedang berkomplot untuk menjatuhkannya.",
  'imgcard':'card-luhut-binsar-pandjaitan.png',
  'imgfight':'fight-luhut-binsar-pandjaitan.png'
  },
  {
  'nama':'Prabowo Subianto',
  'init':0,
  'index':7,
  'zodiak':'Libra',
  'card1':'<span class="strong">Mesin tempur</span> : Grup Nusantara',
  'card2':'<span class="strong">Daya keruk</span> : Penuh misteri',
  'card3':'<span class="strong">Luas wilayah</span> : 62.753 ha (2019)',
  'card4':'<span class="strong">Jurus andalan</span> : Berkuda mengejar mimpi',
  'card5':'<span class="strong">Jabatan</span> : Menteri Pertahanan & Ketua Umum Partai Gerindra',
  'artikel':"<p>Sebagai menantu keluarga cendana, karir Prabowo di militer begitu mulus. Namun itu tidak bertahan lama, setelah mertuanya, Soeharto mundur sebagai presiden setelah 32 tahun menjabat, karir militer Prabowo remuk. Penculikan aktivis yang dilakukan Prabowo bersama Tim Mawar pada 1998 membuatnya diberhentikan dari militer. Setelah kehilangan kekuatan, Prabowo pergi dari Indonesia. Ia sempat tinggal di Yordania, Jerman, dan Malaysia sebelum kembali ke Indonesia pada tahun 2000. Sejak itu ia mulai mengembangkan bisnis, menjajal peruntungan di politik, sembari menekuni hobi berkuda. Pada 2004 ia menjajal ikut konvensi calon presiden Partai Golkar, namun kalah di putaran pertama. Pada tahun 2008 ia mendirikan partai Gerindra, lalu maju menjadi calon wakil presiden mendampingi Megawati Soekarnoputri sebagai calon presiden pada pilpres 2009, namun kalah. Berturut-turut pada tahun 2014 dan 2019 ia maju sebagai calon presiden, namun juga kalah.<br><br><p><span style='font-size:1.2rem'>Menteri Pertahanan dan Pemilik Partai Gerindra</span><p>Setelah dikalahkan dua kali oleh Jokowi dalam Pilpres 2014 dan 2019, Prabowo akhirnya memutuskan bergabung dengan koalisi pemerintah setelah selama 10 tahun menjadi oposisi. Ia mendapat jabatan sebagai menteri pertahanan, sedangkan Sandiaga Uno, pasangannya dalam Pilpres 2019 mendapat jabatan sebagai menteri pariwisata dan ekonomi kreatif pada 2020.<br><br><p><span style='font-size:1.2rem'>Libra</span><p>Seorang Libra biasanya penuh keseimbangan. Ia diplomatis dan lihai mencari titik temu yang bisa menyatukan pihak-pihak yang berseteru. Ia pandai bergaul dan senang berkumpul bersama siapa saja. Salah satu kebiasaan buruk seorang Libra adalah gemar mengasihani diri sendiri dan merasa dunia berputar di sekelilingnya. Maka, saat sesuatu berjalan tak sesuai rencana, ia bisa jadi begitu dramatis dan menganggap semua sedang berkomplot untuk menjatuhkannya.",
  'imgcard':'card-prabowo-subianto.png',
  'imgfight':'fight-prabowo-subianto.png'
  },
  {
  'nama':'Sandiaga Uno',
  'init':0,
  'index':8,
  'zodiak':'Cancer',
  'card1':'<span class="strong">Mesin tempur</span> : PT Adaro Energy',
  'card2':'<span class="strong">Daya keruk</span> : 54,53 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 316.619 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Menjadi viral dengan tingkah kosong',
  'card5':'<span class="strong">Jabatan</span> : Menteri Pariwisata & Ekonomi Kreatif & Wakil Ketua Dewan Pembina partai Gerindra',
  'artikel':"<p>Nama Sandi mencuat di publik saat ia maju bersama Anies Baswedan dalam Pilkada DKI Jakarta 2017. Mereka menang, namun baru satu tahun menjabat Sandi memilih mundur dan maju menjadi calon wakil Presiden bersama Prabowo Subianto. Selama masa kampanye itu, Sandi kerap bertingkah konyol sehingga viral di media sosial. Dalam Pilpres 2019 itu ia beda kubu politik dengan karibnya, Erick Thohir yang menjadi ketua tim pemenangan Jokowi-Maruf Amin. <br><br><p><span style='font-size:1.2rem'>Relasi bisnis</span><p>Pada 2002, PT Saratoga Investama Sedaya yang dibangun Sandi bersama Edwin Soeryadjaya mulai berinvestasi di Grup Adaro yang kini dipimpin Garibaldi “Boy” Thohir, kakak dari Menteri Badan Usaha Milik Negara Erick Thohir. Per 2020, kepemilikan Saratoga di PT Adaro Energy–induk usaha batubara Grup Adaro–tercatat menyentuh 58,46%, baik secara langsung maupun tak langsung.<br><br><p><span style='font-size:1.2rem'>Menteri Pariwisata dan Ekonomi Kreatif dan Wakil Ketua Dewan Pembina partai Gerindra</span><p>Begitu pesta demokrasi selesai, partai Gerindra memutuskan bergabung dengan koalisi pemerintah. Sandi pun mendapat posisi sebagai menteri Pariwisata dan Ekonomi Kreatif sejak akhir 2020. Sampai saat ini Sandi juga menjabat wakil ketua dewan pembina Partai Gerindra, yang masih dipimpin Prabowo. Sama seperti Sandi, Prabowo memiliki bisnis batubaranya sendiri melalui Grup Nusantara.<br><br><p><span style='font-size:1.2rem'>Cancer</span><p>Seperti kepiting yang jadi simbol zodiak ini, seorang kanser merasa paling nyaman saat berada di cangkang atau rumahnya sendiri, atau saat berkumpul bersama orang-orang terdekatnya. Ada lapisan tebal yang membungkus dirinya, meski di dalam ia adalah pribadi yang penuh emosi dan kadang kelewat sensitif. Ia punya selera humor canggung. Ia sangat loyal dan protektif, sehingga bisa melakukan apa saja untuk melindungi keluarga dan para sahabatnya.",
  'imgcard':'card-sandiaga-uno.png',
  'imgfight':'fight-sandiaga-uno.png'
  },
  {
  'nama':'Erick Thohir',
  'init':0,
  'index':9,
  'zodiak':'Gemini',
  'card1':'<span class="strong">Mesin tempur</span> : Mining Industry Indonesia (MIND ID)',
  'card2':'<span class="strong">Daya keruk</span> : 25,15 juta ton batubara (2020)',
  'card3':'<span class="strong">Luas wilayah</span> : 109.985 ha',
  'card4':'<span class="strong">Jurus andalan</span> : Bongkar pasang direksi BUMN',
  'card5':'<span class="strong">Jabatan</span> : Menteri BUMN',
  'artikel':"<p>Sejak menjabat sebagai Menteri BUMN, Erick Thohir banyak melakukan bongkar pasang direksi BUMN. Pada Desember 2021 Erick membongkar direksi anak perusahaan MIND ID seperti PT Aneka Tambang Tbk, PT Timah Tbk, dan PT Bukit Asam Tbk. Kocok ulang jabatan ini dimulai dari direktur utama MIND ID yang semula dijabat Orias Petrus Moedak diganti Hendi Prio Santoso yang sebelumnya direktur utama PT Semen Indonesia Tbk. Lalu dilanjutkan dengan pergantian direktur utama PT Timah Tbk dari M Riza Pahlevi Tabrani menjadi Achmad Ardianto, direktur keuangan dari M Krisna Sjarif menjadi Wibisono, direktur SDM dari Muhammad Rizki menjadi Yennita, Direktur Pengembangan Usaha Alwin Albar diganti Purwoko. Pada jajaran komisaris, PT Timah Tbk memberhentikan dengan hormat Rudy Suhendar. Kemudian, perseroan menambah anggota komisaris yang terdiri dari Yudo Dwinanda Priadi dan Danny Praditya.<br><br><p><span style='font-size:1.2rem'>Menteri BUMN</span><p>Kesuksesan Erick Thohir sebagai ketua panitia pelaksanaan Asian Games 2018 membuat namanya melambung. Ia pun dilirik Jokowi untuk menjadi ketua pemenangan kampanye pada pilpres 2019. Keberhasilan Erick mengantarkan kemenangan Jokowi dalam pilpres 2019 membuatnya dihadiahi jabatan elite sebagai menteri BUMN. <br><br><p><span style='font-size:1.2rem'>Gemini</span><p>Seorang Gemini biasanya penuh gairah hidup. Ia senang sekali bergaul, berbagi cerita, dan bergosip (jangan ceritakan rahasia Anda kepadanya). Makanya, ia sering jadi pusat perhatian. Ia mudah beradaptasi dengan situasi dan gemar mencoba hal-hal baru. Bisa dikatakan, ia adalah pribadi yang impulsif. Ia bisa hilang fokus di tengah jalan dan tiba-tiba mengambil keputusan sembrono. Ia cerdas, tapi kadang kelewat analitis sehingga jadi terkesan tak tegas.",
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
    console.log('level ' + qlevel)
    shuffle(qlevel)
    answerval = questGenerator(qlevel,0)
    enemyName.html(data[selevel].nama)
    let inputval = $('#fname').val()
    playerName.html(inputval)
    console.log(inputval)

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
  console.log('first '+ number)
  
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
  
  console.log('function' + 'ca1 '+ca1+' ca2 '+ca2)
  
} //generate question

submit.click(()=> {//answer
  console.log('click' + 'ca1 '+ca1+' ca2 '+ca2)
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
      alert('Pilih Jawaban!')
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
        //if win
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

answer1.click(()=> {
  sel = 'ca1'
  toggleButton(answer1, answer2)
  console.log(sel)
}) //click option A answer

answer2.click(()=> {
  sel = 'ca2'
  toggleButton(answer2, answer1)
  console.log(sel)
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