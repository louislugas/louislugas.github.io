let step = document.getElementsByClassName("step");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let submitBtn = document.getElementById("submit-btn");
let form = document.getElementsByTagName("form")[0];
let preloader = document.getElementById("preloader-wrapper");
let bodyElement = document.querySelector("body");
let succcessDiv = document.getElementById("success");

let full_name = document.getElementById("namamu");
let page2Text = document.getElementById("page2-text");
let page3Text = document.getElementById("page3-text");
let page4Text = document.getElementById("page4-text");

// DEKLARASI DATA
let data = []
let filter1 = []
let filter2 = []
// RECAP PAGE
let recap = document.getElementById("recap")

// 1 BUAH
let jBuah = document.getElementById("jumlahBuah");
let sBuah = document.getElementById("satuanBuah");
let nBuah = document.getElementById("buah");
let imgBuah = document.getElementById("imgBuah");

// 2 SAYURAN MENTAH
let jSayur = document.getElementById("jumlahSayur");
let sSayur = document.getElementById("satuanSayur");
let nSayur = document.getElementById("sayur");
let imgSayur = document.getElementById("imgSayur");

// 3 BIJI-BIJIAN
let jBiji = document.getElementById("jumlahBiji");
let sBiji = document.getElementById("satuanBiji");
let nBiji = document.getElementById("biji");
let imgBiji = document.getElementById("imgBiji");

// 4 REMPAH
let jRempah = document.getElementById("jumlahRempah");
let sRempah = document.getElementById("satuanRempah");
let nRempah = document.getElementById("rempah");
let imgRempah = document.getElementById("imgRempah");

// 5 PROTEIN
let jProt = document.getElementById("jumlahProtein");
let sProt = document.getElementById("satuanProtein");
let nProt = document.getElementById("protein");
let imgProt = document.getElementById("imgProtein");

// 6 KARBOHIDRAT
let jKarb = document.getElementById("jumlahKarbo");
let sKarb = document.getElementById("satuanKarbo");
let nKarb = document.getElementById("karbo");
let imgKarb = document.getElementById("imgKarbo");

// 7 BUMBU
let jBumbu = document.getElementById("jumlahBumbu");
let sBumbu = document.getElementById("satuanBumbu");
let nBumbu = document.getElementById("bumbu");
let imgBumbu = document.getElementById("imgBumbu");

// 8 KUAH
let jKuah = document.getElementById("jumlahKuah");
let sKuah = document.getElementById("satuanKuah");
let nKuah = document.getElementById("kuah");
let imgKuah = document.getElementById("imgKuah");

// 9 SAYURAN MATANG
let jSmtg = document.getElementById("jumlahSayurOlah");
let sSmtg = document.getElementById("satuanSayurOlah");
let nSmtg = document.getElementById("sayurolah");
let imgSmtg = document.getElementById("imgSayurOlah");

// 10 MAKANAN KEMASAN
let jMkn = document.getElementById("jumlahMakananKemasan");
let sMkn = document.getElementById("satuanMakananKemasan");
let nMkn = document.getElementById("makanankemasan");
let imgMkn = document.getElementById("imgMakananKemasan");

// 11 MINUMAN KEMASAN
let jMin = document.getElementById("jumlahMinumanKemasan");
let sMin = document.getElementById("satuanMinumanKemasan");
let nMin = document.getElementById("minumankemasan");
let imgMin = document.getElementById("imgMinumanKemasan");

// 12 PRODUK TEPUNG 
let jTepung = document.getElementById("jumlahBubuk");
let sTepung = document.getElementById("satuanBubuk");
let nTepung = document.getElementById("bubuk");
let imgTepung = document.getElementById("imgBubuk");

form.onsubmit = () => {
  return false;
};

// INISIASI HALAMAN 0
let current_step = 0;
let stepCount = 2;
step[current_step].classList.add("d-block");

// HALAMAN AWAL TOMBOL PREV, SUBMIT, & NEXT DITIADAKAN
if (current_step == 0) {
  prevBtn.classList.add("d-none");
  submitBtn.classList.add("d-none");
  nextBtn.classList.add("d-inline-block");
}

// PROGRESS BAR
const progress = (value) => {
  document.getElementsByClassName("progress-bar")[0].style.width = `${value}%`;
};

// NEXT BUTTON
nextBtn.addEventListener("click", () => {
  // CEK NAMA SUDAH TERISI
  if (full_name.value == "") {
    alert("mohon masukan nama");
    return;
  }

  // REPLACE NAMA DI SETIAP HALAMAN
  page2Text.innerHTML = page2Text.innerHTML.replace("$NAMAMU$", full_name.value);
  page3Text.innerHTML = page3Text.innerHTML.replace("$NAMAMU$", full_name.value);
  page4Text.innerHTML = page4Text.innerHTML.replace("$NAMAMU$", full_name.value);

  if (current_step == 0) {
    // start (do nothing)
  } else if (current_step == 1) {
    // get input data
    // Masukkan ((SEMUA)) data input
    data.push({
      'nama': nBuah.innerText,
      'jumlah': parseInt(jBuah.value),
      'satuan': sBuah.value,
      'src': imgBuah.src
    },{
      'nama': nSayur.innerText,
      'jumlah': parseInt(jSayur.value),
      'satuan': sSayur.value,
      'src': imgSayur.src
    },{
      'nama': nBiji.innerText,
      'jumlah': parseInt(jBiji.value),
      'satuan': sBiji.value,
      'src': imgBiji.src
    },{
      'nama': nRempah.innerText,
      'jumlah': parseInt(jRempah.value),
      'satuan': sRempah.value,
      'src': imgRempah.src
    },{
      'nama': nProt.innerText,
      'jumlah': parseInt(jProt.value),
      'satuan': sProt.value,
      'src': imgProt.src
    },{
      'nama': nKarb.innerText,
      'jumlah': parseInt(jKarb.value),
      'satuan': sKarb.value,
      'src': imgKarb.src
    },{
      'nama': nBumbu.innerText,
      'jumlah': parseInt(jBumbu.value),
      'satuan': sBumbu.value,
      'src': imgBumbu.src
    },{
      'nama': nKuah.innerText,
      'jumlah': parseInt(jKuah.value),
      'satuan': sKuah.value,
      'src': imgKuah.src
    },{
      'nama': nSmtg.innerText,
      'jumlah': parseInt(jSmtg.value),
      'satuan': sSmtg.value,
      'src': imgSmtg.src
    },{
      'nama': nMkn.innerText,
      'jumlah': parseInt(jMkn.value),
      'satuan': sMkn.value,
      'src': imgMkn.src
    },{
      'nama': nMin.innerText,
      'jumlah': parseInt(jMin.value),
      'satuan': sMin.value,
      'src': imgMin.src
    },{
      'nama': nTepung.innerText,
      'jumlah': parseInt(jTepung.value),
      'satuan': sTepung.value,
      'src': imgTepung.src
    })
    // filter berdasarkan jumlah yang bukan 0
    filter1 = data.filter((data) => {
      return data.jumlah != 0
    })
    // filter berdasarkan satuan yang sudah dipilih
    filter2 = filter1.filter((data) => {
      return data.satuan != 'pilih satuan'
    })
    // tampilkan setiap data sesuai style
    filter2.forEach((data) => {
      // variables
      let container = document.createElement('div')
      let card = document.createElement('div')
      let cardbody = document.createElement('div')
      let row = document.createElement('div')
      let colimg = document.createElement('div')
      let img = document.createElement('img')
      let colcontent = document.createElement('div')
      let para1 = document.createElement('p')
      let para2 = document.createElement('p')
      let coloutput = document.createElement('div')
      let output = document.createElement('p')

      //class
      container.classList.add('container', 'mb-2')
      card.classList.add('card')
      cardbody.classList.add('card-body')
      row.classList.add('row', 'row-cols-2', 'row-cols-md-4')
      colimg.classList.add('col-3', 'd-flex', 'align-items-center')
      img.classList.add('rounded')
      colcontent.classList.add('col-4', 'd-flex', 'flex-column', 'justify-content-center')
      para1.classList.add('fs-5', 'fs-sm-6','mb-1', 'fw-bold', 'lh-sm','text-center')
      para2.classList.add('fs-6', 'mb-0', 'fw-light', 'lh-base')
      coloutput.classList.add('col-4', 'd-flex', 'align-items-center')
      output.classList.add('fs-5','fs-sm-6', 'mb-1', 'fw-bold', 'lh-sm','text-center')

      //test data
      console.log(data.nama, data.jumlah, data.satuan, data.src)

      //content
      img.src = data.src
      para1.innerHTML = data.nama
      output.innerHTML = data.jumlah + " " + data.satuan

      let cardContainer = recap.appendChild(container).appendChild(card).appendChild(cardbody).appendChild(row)
      cardContainer.appendChild(colimg).appendChild(img)
      cardContainer.appendChild(colcontent).appendChild(para1)
      cardContainer.appendChild(coloutput).appendChild(output)

    })


  }

  // PROGRESS HALAMAN
  current_step++;

  // HALAMAN SEBELUMNYA
  let previous_step = current_step - 1;

  if (current_step > 0 && current_step <= stepCount) {
    prevBtn.classList.remove("d-none");
    prevBtn.classList.add("d-inline-block");
    step[current_step].classList.remove("d-none");
    step[current_step].classList.add("d-block");
    step[previous_step].classList.remove("d-block");
    step[previous_step].classList.add("d-none");
    // HALAMAN TERAKHIR
    if (current_step == stepCount) {
      submitBtn.classList.remove("d-none");
      submitBtn.classList.add("d-inline-block");
      nextBtn.classList.remove("d-inline-block");
      nextBtn.classList.add("d-none");
    }
  } else {
    if (current_step > stepCount) {
      form.onsubmit = () => {
        return true;
      };
    }
  }

  // PROGRESS BAR
  progress((100 / stepCount) * current_step);
});

// PREVIOUS BUTTON
prevBtn.addEventListener("click", () => {
  if (current_step > 0) {
    current_step--;
    let previous_step = current_step + 1;
    prevBtn.classList.add("d-none");
    prevBtn.classList.add("d-inline-block");
    step[current_step].classList.remove("d-none");
    step[current_step].classList.add("d-block");
    step[previous_step].classList.remove("d-block");
    step[previous_step].classList.add("d-none");
    if (current_step < stepCount) {
      submitBtn.classList.remove("d-inline-block");
      submitBtn.classList.add("d-none");
      nextBtn.classList.remove("d-none");
      nextBtn.classList.add("d-inline-block");
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
    }
  }

  if (current_step == 0) {
    prevBtn.classList.remove("d-inline-block");
    prevBtn.classList.add("d-none");
  }
  progress((100 / stepCount) * current_step);
});

// SUBMIT BUTTON
submitBtn.addEventListener("click", () => {
  preloader.classList.add("d-block");

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  timer(500)
    .then(() => {
      bodyElement.classList.add("loaded");
    })
    .then(() => {
      step[stepCount].classList.remove("d-block");
      step[stepCount].classList.add("d-none");
      prevBtn.classList.remove("d-inline-block");
      prevBtn.classList.add("d-none");
      submitBtn.classList.remove("d-inline-block");
      submitBtn.classList.add("d-none");
      succcessDiv.classList.remove("d-none");
      succcessDiv.classList.add("d-block");
    });
});

