//RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////////
var container = document.querySelector('.container')          //
var w = window.screen.width,                                  //
    h = window.screen.height                                  //
var gw, gh;                                                   //
var font, space, mult, left, top;
var mapxup, mapyup, mapxdn, mapydn, zoom, weight,
    dash, exup, exdn, exstat;
                                                              //
//console.log( 'initial size','width' ,w, 'height', h)          //
                                                              //
                                                              //
                                                              //
if ( w < h ) { // MOBILE                                      //
    zoom = 5
    weight = 1
    dash = 1
    exup = '370px'
    exdn = '95px' 
    mapxup = -15.5
    container.style.height = '700px'                          //
    container.style.width = '367px'                           //
                                                              //
} else if ( w > h ) { // DESKTOP
    zoom = 6 
    weight = 1.5   
    dash = 1  
    exup = '382px'
    exdn = '107px'   
    mapxup = -10.9                                            //
    container.style.height = '850px'                          //
    container.style.width = '560px'                           //
                                                              //
};                                                            //
//END RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////

var search = document.querySelector('#search')
var result = document.querySelector('#result')
var down1 = document.querySelector('.down1')
var down2 = document.querySelector('.down2')
var control2 = document.querySelector('.control2')
var control1 = document.querySelector('.control1')
var extent = document.querySelector('.extent')
var omnibus = document.querySelector('.omnibus')
var svgsearch1 = document.getElementsByClassName('svg-search')[0],
    svgsearch2 = document.getElementsByClassName('svg-search')[1]
var svgresult1 = document.getElementsByClassName('svg-result')[0],
    svgresult2 = document.getElementsByClassName('svg-result')[1],
    svgresult3 = document.getElementsByClassName('svg-result')[2]

var searchtxt = document.querySelector('#ico-text-search')
var resulttxt = document.querySelector('#ico-text-result')
var omniswitch = document.querySelector('.omniswitch')
var omnistate = 0

var c1 = 0,
    c2 = 0

exstat = 0
//console.log(exstat)

function mapUpDesktop() {
    map.setView([mapxup, 110.7122], zoom, { // koordinat baru, zoom, pan option
        animate: true,
        pan: {
            duration: 1
        },
        easeLinearity: 0.1
    }) //end set setView
    
    
}

function colorOff() {
    searchtxt.style.color='#444444'
    svgsearch1.style.stroke='#444444'
    svgsearch2.style.stroke='#444444'

    resulttxt.style.color='#444444'
    svgresult1.style.fill='#444444'
    svgresult2.style.fill='#444444'
    svgresult3.style.fill='#444444'
}

function colorSearch() {
    searchtxt.style.color='#2196F3'
    svgsearch1.style.stroke='#2196F3'
    svgsearch2.style.stroke='#2196F3'

    resulttxt.style.color='#444444'
    svgresult1.style.fill='#444444'
    svgresult2.style.fill='#444444'
    svgresult3.style.fill='#444444'
}

function colorResult() {
    resulttxt.style.color='#2196F3'
    svgresult1.style.fill='#2196F3'
    svgresult2.style.fill='#2196F3'
    svgresult3.style.fill='#2196F3'

    searchtxt.style.color='#444444'
    svgsearch1.style.stroke='#444444'
    svgsearch2.style.stroke='#444444'
}

function mapDownDesktop() {
    map.setView([-7.6145, 110.7122], zoom, { // koordinat baru, zoom, pan option
        animate: true,
        pan: {
            duration: 1
        },
        easeLinearity: 0.1
    }) //end set setView
}

function omniUp() {
   omnibus.style.bottom = exup
}

function omniDown() {
    omnibus.style.bottom = exdn
}

function control2Up() {
    control2.style.bottom = '0px'
    control2.style.zIndex = 601
    control1.style.zIndex = 600
    c2 = 1
}

function control2Down() {
    control2.style.bottom = '-350px'
    c2 = 0
}

function control1Up() {
    control1.style.bottom = '0px'
    control2.style.zIndex = 600
    control1.style.zIndex = 601
    c1 = 1
}

function control1Down() {
    control1.style.bottom = '-350px'
    c1 = 0
}

function extentUp() {
    extent.style.bottom = exup
}

function extentDown() {
    extent.style.bottom = exdn
}


search.addEventListener('click', () => {
    if (c2 == 1 || c2 == 0) {
        extentUp()
        omniUp()
        colorSearch()
    }

    if (c2 == 1) {
        setTimeout(()=> {
            control1Up()
        }, 400)
    } else if (c2 == 0) {
        control1Up()
    }
    
    control2Down()
})

result.addEventListener('click', () => {
    if (c1 == 1 || c1 == 0) {
        extentUp()
        omniUp()
        colorResult()
    }
    
    if (c1 == 1) {
        setTimeout(()=> {
            control2Up()
        }, 400)
    } else if (c1 == 0) {
        control2Up()
    }

    control1Down()
})

down2.addEventListener('click', () => {
    control2Down()
    extentDown()
    omniDown()
    colorOff()
})

extent.addEventListener('click', () => {
    extentDown()
    omniDown()
    control1Down()
    control2Down()
    mapDownDesktop()
    colorOff()
    exstat = 0
})

down1.addEventListener('click', () => {
    control1Down()
    extentDown()
    omniDown()
    colorOff()
})

var map = document.querySelector('#map')

var select1 = document.querySelector('#select-1'),
    select2 = document.querySelector('#select-2'),
    select3 = document.querySelector('#select-3'),
    select4 = document.querySelector('#select-4'),
    calc = document.querySelector('.startsearch')

var kotatext = document.querySelector('.kota'),
    statustext = document.querySelector('.status'),
    upahtext = document.querySelector('#numumk'),
    biayatext = document.querySelector('#numbiaya'),
    selisihtext = document.querySelector('#numselisih')

var layerGroup = new L.LayerGroup();

var map = L // buat peta
    .map('map', { 
        zoomControl: true,      // mematikan fitur zoom "+" & "-"
        boxZoom: false,          // mematikan fitur box zoom
        doubleClickZoom: true,  // mematikan fitur zoom dengan double click
        dragging: true,         // mematikan fitur drag
        scrollWheelZoom: false   // mematikan fitur zoom dengan scroll
    })
    .setView([-7.6145, 110.7122], zoom); // koordinat (y, x) awal peta, zoom level

var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // OPEN STREET MAP
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//console.log(data['features'][0]['geometry'])

var size = Object.keys(data['features']).length
//console.log(size)

var province = []
var city = []
var scale = []

var scaleMin, scaleMax

layerGroup.addTo(map)

///////////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < size; i++ ) {//FILTER ONLY NUMBERS
        scale[i] = {
            selisih: (data['features'][i]['properties'].selisih)
        }    
    }
    
    var scaleMin = scale.reduce(function(a, b) {
        return (b.selisih < a.selisih) ? b : a;
    })
    
    var min = scaleMin.selisih
    
    //console.log(min)

    var color = chroma
        .scale(['#a50026', '#ffffbf', '#006837'])
        .domain([min, 0, 5000000])

    function colorizeUmk(a, b ) {
        var sel1 = select1.selectedIndex,
            sel2 = select2.selectedIndex

        if ( sel1 == 0 && sel2 == 0 ) {
            return a - b
        } else if  ( sel1 == 0 && sel2 == 1) {
            return a - (2*b)
        } else if  ( sel1 == 0 && sel2 == 2) {
            return a - (3*b)
        } else if  ( sel1 == 0 && sel2 == 3) {
            return a - (4*b)
        } else if  ( sel1 == 1 && sel2 == 0) {
            return a - (2*b)
        } else if  ( sel1 == 1 && sel2 == 1) {
            return a - (3*b)
        } else if  ( sel1 == 1 && sel2 == 2) {
            return a - (4*b)
        } else if  ( sel1 == 1 && sel2 == 3) {
            return a - (5*b)
        } else if  ( sel1 == 2 && sel2 == 0) {
            return (2*a) - (2*b)
        } else if  ( sel1 == 2 && sel2 == 1) {
            return (2*a) - (3*b)
        } else if  ( sel1 == 2 && sel2 == 2) {
            return (2*a) - (4*b)
        } else if  ( sel1 == 2 && sel2 == 3) {
            return (2*a) - (5*b)
        }
    }
    
    function calculateUmp(a,b) {
        if ( a == '31' ) {
            return b = 4276349
        } else if ( a == '32' ) {
            return b = 1810000
        } else if ( a == '33' ) {
            return b = 1742015
        } else if ( a == '34' ) {
            return b = 1704608
        } else if ( a == '35' ) {
            return b = 1768777
        } else if ( a == '36' ) {
            return b = 2460996
        }
    }

    function basicUmkMap() {

        function style(d) { // chloropleth styling
        
            return {
                fillColor: color(colorizeUmk(d.properties.umk, d.properties.gradient)),
                weight: weight,
                opacity: 1,
                color: '#515151',
                dashArray: dash,
                fillOpacity: 0.8
            }        
        }

        var layer = L.geoJson(data, {style:style, onEachFeature: onEachFeature}); // add chloropleth to map

        var click = 0
        ////////////////////// MOUSEOVER ////////////////////

        function highlightFeature(e) {
            var hl = e.target;

            click = 1

            hl.setStyle({
                weight: 5,
                color: '#333',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                hl.bringToFront();
            }
            
            var upahmin = e.target.feature.properties.umk
            var rupiah = upahmin.toLocaleString('de-DE')
            var umpa = calculateUmp(e.target.feature.properties.provno, e.target.feature.properties.umk)
            var rupiahump = umpa.toLocaleString('de-DE')

            hl.bindPopup(e.target.feature.properties.provinsi+ '<br><strong>' + e.target.feature.properties.kabkot + '</strong><br> UMK : Rp' +rupiah+'<br> UMP : Rp'+ rupiahump)
            
        }

        function resetHighlight(e) {
            click = 0
            layer.resetStyle(e.target);
        }

        function onEachFeature(feature, hl) {
            hl.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        }

        

        layerGroup.addLayer(layer)
    }

    function basicUmpMap() {

        function style(d) { // chloropleth styling
        
            return {
                fillColor: color(colorizeUmk(calculateUmp(d.properties.provno, d.properties.umk), d.properties.gradient)),
                weight: weight,
                opacity: 1,
                color: '#515151',
                dashArray: dash,
                fillOpacity: 0.8
            }        
        }

        var layer = L.geoJson(data, {style:style, onEachFeature: onEachFeature}); // add chloropleth to map

        var click = 0
        ////////////////////// MOUSEOVER ////////////////////

        function highlightFeature(e) {
            var hl = e.target;

            click = 1

            hl.setStyle({
                weight: 5,
                color: '#333',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                hl.bringToFront();
            }

            var upahmin = e.target.feature.properties.umk
            var rupiah = upahmin.toLocaleString('de-DE')
            var umpa = calculateUmp(e.target.feature.properties.provno, e.target.feature.properties.umk)
            var rupiahump = umpa.toLocaleString('de-DE')

            hl.bindPopup(e.target.feature.properties.provinsi+ '<br><strong>' + e.target.feature.properties.kabkot + '</strong><br> UMK : Rp' +rupiah+'<br> UMP : Rp'+ rupiahump)
        }

        function resetHighlight(e) {
            click = 0
            layer.resetStyle(e.target);
        }

        function onEachFeature(feature, hl) {
            if (click == 0) {
                hl.on({
                    click: highlightFeature
                })
            } else if (click == 1) {
                hl.on({
                    click:resetHighlight
                })
            }

            hl.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        }

        layerGroup.addLayer(layer)
        
    }
    
    basicUmkMap()
    
///////////////////////////////////////////////////////////////////////////////////


////console.log(Math.min(data.features[0].properties.selisih))

for (let i = 0; i < size; i++) { //FILTER ONLY PROVINCE
    province[i] = {
        provinsi: (data['features'][i]['properties'].provinsi),
        provno: (data['features'][i]['properties'].provno)
    }
}

for (let i = 0; i < size; i++) { //FILTER ONLY CITIES
    city[i] = {
        kabkot: (data['features'][i]['properties'].kabkot),
        kabkotno: (data['features'][i]['properties'].kabkotno),
        provno: (data['features'][i]['properties'].provno),
        umk: (data['features'][i]['properties'].umk),
        selisih: (data['features'][i]['properties'].selisih),
        biaya: (data['features'][i]['properties'].gradient),
        geometry: (data['features'][i]['geometry'].coordinates)
    }
}

////console.log(province[0])
////console.log(city[0])

var select = new Set()

var selectCity,
    selecCalc

var selectProv = province.filter(d => { // FILTER PROVINSI
    const dup = select.has(d.provno);
    select.add(d.provno);
    return !dup;
})

////console.log(selectCity)
////console.log(selectProv[1].provno)

for (let i = 0; i < selectProv.length; i++) { // ADD PROVINCE TO OPTIONS
    let opt = selectProv[i]
    let el = document.createElement('option')
    el.text = opt.provinsi
    el.value = opt.provno
    select3.appendChild(el)
}

select3.addEventListener('change', () => { // PER PERUBAHAN PILIHAN PROVINSI
    ////console.log('change')
    let el = select3.selectedIndex
    let opt = select3.getElementsByTagName('option')
    ////console.log(el)
    ////console.log(opt[el].value)

    selectCity = city.filter( d => {
        return d.provno == opt[el].value
    })

    let length = select4.getElementsByTagName('option').length // option length(size)

    for (let i = length-1; i > 0 ;i-- ) { // remove previous option
        select4.options[i] = null
    }

    for (let i = 0; i < selectCity.length; i++) { // add city option
        let opt = selectCity[i]
        let el = document.createElement('option')
        el.text = opt.kabkot
        el.value = opt.kabkotno
        select4.appendChild(el)
    }

    //console.log(selectCity)

})

select4.addEventListener('change', () => { // PER PERUBAHAN PILIHAN KOTA
    //console.log('change')
})

var stats = 0

calc.addEventListener('click', () => { // KLIK KALKULASI
    calculatedMap()
    iconPeople()
})

omniswitch.addEventListener('change', () => { // TOGGLE OMNIBUS LAW OUTSIDE
    if (omniswitch.checked) {
        //console.log('on')
        omnistate = 1
        //console.log(omnistate)

        if (exstat == 0) {
            basicUmpMap()
        } else if (exstat == 1) {
            umpMap()
        }

    } else if (omniswitch.checked != true) {
        //console.log('off')
        omnistate = 0
        //console.log(omnistate)
        
        if (exstat == 0) {
            basicUmkMap()
        } else if (exstat == 1) {
            umkMap()
        }
    }
})

function calculatedMap() {
    if (omniswitch.checked) { // TOGGLE OMNIBUS LAW INSIDE CALCULATED
        //console.log('omnistate checked')
        umpMap()

    } else if (omnistate.checked != true) {
        //console.log('omnistate unchecked')
        umkMap()
    }
        
    
}

function umkMap() {
        
    let el3 = select3.selectedIndex
    let opt3 = select3.getElementsByTagName('option')

    let el4 = select4.selectedIndex
    let opt4 = select4.getElementsByTagName('option')

    function titleCase(string) { // Title Case
        var sentence = string.toLowerCase().split(" ");
        for(var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
    return sentence.join(' ');
    }

    selectCalc = city.filter( d => {
        return d.kabkotno == opt4[el4].value && d.provno == opt3[el3].value
    })

    if (el3 == 0 && el4 == 0) { // WARNING SIGN PROVINSI BELUM DIPILIH
        alert('Pilih Provinsi!')
    } else if (el4 == 0 && el3 != 0) { // WARNING SIGN KOTA BELUM DIPILIH
        alert('Pilih Kabupaten/Kota!')
    }

    else if (el4 != 0 && el3 !=0) { // JIKA PROVINSI DAN KOTA SUDAH DIPILIH

        layerGroup.clearLayers()
        ////console.log('Calculate')
        let adult = select1.selectedIndex
        let child = select2.selectedIndex
        let upah = selectCalc[0].umk
        let biaya = selectCalc[0].biaya
        let selisih,
        leftItem = document.querySelector('.left')

        // PERHITUNGAN ORANG DEWASA
        if (adult == 0) { 
            selisih = (upah * (adult + 1)) - ((biaya * (adult + 1)) + (biaya * child))
            upah = (upah * (adult + 1))
            biaya = ((biaya * (adult + 1)) + (biaya * child))
        }
        else if (adult == 1) {
            selisih = (upah * adult) - ((biaya * (adult + 1)) + (biaya * child))
            upah = (upah * adult)
            biaya = ((biaya * (adult + 1)) + (biaya * child))
        }

        else if (adult == 2) {
            selisih = (upah * adult) - ((biaya * adult) + (biaya * child))
            upah = (upah * adult)
            biaya = ((biaya * adult) + (biaya * child))
        }


        // PERUBAHAN WARNA SELISIH
        if ( selisih < 0 ) {
            selisihtext.style.color = 'red'
            leftItem.style.backgroundColor = 'pink'
        }

        else if ( selisih > 0 ) {
            selisihtext.style.color = 'green'
            leftItem.style.backgroundColor = 'lightgreen'
        }

        else if ( selisih == 0 ) {
            selisihtext.style.color = 'black'
            leftItem.style.backgroundColor = 'lightgrey'
        }

        let cit = titleCase(select4[select4.selectedIndex].text)
        let prov = titleCase(select3[select3.selectedIndex].text)

        selisih = selisih.toLocaleString('de-DE')
        upah = upah.toLocaleString('de-DE')
        biaya = biaya.toLocaleString('de-DE')

        kotatext.innerHTML = cit + "<br><div class='prov'>" + prov + "</div>"
        statustext.innerHTML = adult + 1 + ' Orang Dewasa & ' + child + ' Anak'
        upahtext.innerHTML = 'Rp'+ upah
        biayatext.innerHTML = 'Rp'+ biaya
        selisihtext.innerHTML = 'Rp'+ selisih

        control1Down()
        setTimeout(() => {
            control2Up()
        }, 400)

        //console.log(selectCalc)
        var geo = selectCalc[0].geometry

        var bounds = L.polygon(geo).getBounds();
        var ne = bounds.getNorthEast(),
            sw = bounds.getSouthWest()
        
        var corner1 = [ne.lng, ne.lat],
            corner2 = [sw.lng, sw.lat]

        exstat = 1

        map.fitBounds([corner1, corner2])

        function filterCity(d) {
            if (d.properties.kabkotno == opt4[el4].value && d.properties.provno == opt3[el3].value)
            return true
        }

        var focus = new L.geoJson(data, {
            filter: filterCity,
            fillOpacity:0.2,
            weight: 3
        })

        colorResult()
        basicUmkMap()
        layerGroup.addLayer(focus)
        stats = 1 
        
    } // end if

           
} // END UMKMAP

function umpMap() {


    let el3 = select3.selectedIndex
    let opt3 = select3.getElementsByTagName('option')

    let el4 = select4.selectedIndex
    let opt4 = select4.getElementsByTagName('option')

    function titleCase(string) { // Title Case
        var sentence = string.toLowerCase().split(" ");
        for(var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
    return sentence.join(' ');
    }

    selectCalc = city.filter( d => {
        return d.kabkotno == opt4[el4].value && d.provno == opt3[el3].value
    })

    if (el3 == 0 && el4 == 0) { // WARNING SIGN PROVINSI BELUM DIPILIH
        alert('Pilih Provinsi!')
    } else if (el4 == 0 && el3 != 0) { // WARNING SIGN KOTA BELUM DIPILIH
        alert('Pilih Kabupaten/Kota!')
    }

    else if (el4 != 0 && el3 !=0) { // JIKA PROVINSI DAN KOTA SUDAH DIPILIH
        layerGroup.clearLayers()
        ////console.log('Calculate')
        let adult = select1.selectedIndex
        let child = select2.selectedIndex
        let biaya = selectCalc[0].biaya
        let selisih,
            upah
        let provno = selectCalc[0].provno,
        leftItem = document.querySelector('.left')

        //console.log(provno)

        if (provno == '31') {
            upah = 4276349
        } else if (provno == '32') {
            upah = 1810000
        } else if (provno == '33') {
            upah = 1742015
        } else if (provno == '34') {
            upah = 1704608
        } else if (provno == '35') {
            upah = 1768777
        } else if (provno == '36') {
            upah = 2460996
        }

        //console.log(upah)

        // PERHITUNGAN ORANG DEWASA
        if (adult == 0) { 
            selisih = (upah * (adult + 1)) - ((biaya * (adult + 1)) + (biaya * child))
            upah = (upah * (adult + 1))
            biaya = ((biaya * (adult + 1)) + (biaya * child))
        }
        else if (adult == 1) {
            selisih = (upah * adult) - ((biaya * (adult + 1)) + (biaya * child))
            upah = (upah * adult)
            biaya = ((biaya * (adult + 1)) + (biaya * child))
        }

        else if (adult == 2) {
            selisih = (upah * adult) - ((biaya * adult) + (biaya * child))
            upah = (upah * adult)
            biaya = ((biaya * adult) + (biaya * child))
        }


        // PERUBAHAN WARNA SELISIH
        if ( selisih < 0 ) {
            selisihtext.style.color = 'red'
            leftItem.style.backgroundColor = 'pink'
        }

        else if ( selisih > 0 ) {
            selisihtext.style.color = 'green'
            leftItem.style.backgroundColor = 'lightgreen'
        }

        else if ( selisih == 0 ) {
            selisihtext.style.color = 'black'
            leftItem.style.backgroundColor = 'lightgrey'
        }

        let cit = titleCase(select4[select4.selectedIndex].text)
        let prov = titleCase(select3[select3.selectedIndex].text)

        selisih = selisih.toLocaleString('de-DE')
        upah = upah.toLocaleString('de-DE')
        biaya = biaya.toLocaleString('de-DE')

        kotatext.innerHTML = cit + "<br><div class='prov'>" + prov + "</div>"
        statustext.innerHTML = adult + 1 + ' Orang Dewasa & ' + child + ' Anak'
        upahtext.innerHTML = 'Rp'+ upah
        biayatext.innerHTML = 'Rp'+ biaya
        selisihtext.innerHTML = 'Rp'+ selisih

        control1Down()
        setTimeout(() => {
            control2Up()
        }, 400)

        //console.log(selectCalc)
        var geo = selectCalc[0].geometry

        var bounds = L.polygon(geo).getBounds();
        var ne = bounds.getNorthEast(),
            sw = bounds.getSouthWest()
        
        var corner1 = [ne.lng, ne.lat],
            corner2 = [sw.lng, sw.lat]

        exstat = 1

        map.fitBounds([corner1, corner2])

        function filterCity(d) {
            if (d.properties.kabkotno == opt4[el4].value && d.properties.provno == opt3[el3].value)
            return true
        }

        var focus = new L.geoJson(data, {
            filter: filterCity,
            fillOpacity:0.2,
            weight: 3
        })

        colorResult()
        basicUmpMap()
        layerGroup.addLayer(focus)
        stats = 1  
        
    } // end if
  
} // END UMPMAP

function iconPeople() {
    var sel1 = select1.selectedIndex,
        sel2 = select2.selectedIndex,
        icon1 = document.querySelector('.icon-1'),
        icon2 = document.querySelector('.icon-2'),
        icon3 = document.querySelector('.icon-3'),
        icon4 = document.querySelector('.icon-4'),
        icon5 = document.querySelector('.icon-5'),
        icon6 = document.querySelector('.icon-6'),
        icon7 = document.querySelector('.icon-7'),
        icon8 = document.querySelector('.icon-8')
    
    if ((sel1 == 1 && sel2 == 0) || ( sel1 == 2 && sel2 == 0)) {
        icon1.style.opacity = 1
        icon2.style.opacity = 0
        icon3.style.opacity = 0
        icon4.style.opacity = 0
        icon5.style.opacity = 0
        icon6.style.opacity = 0
        icon7.style.opacity = 0
        icon8.style.opacity = 0
    } else if ((sel1 == 1 && sel2 == 1) || ( sel1 == 2 && sel2 == 1)) {
        icon1.style.opacity = 0
        icon2.style.opacity = 1
        icon3.style.opacity = 0
        icon4.style.opacity = 0
        icon5.style.opacity = 0
        icon6.style.opacity = 0
        icon7.style.opacity = 0
        icon8.style.opacity = 0
    } else if ((sel1 == 1 && sel2 == 2) || ( sel1 == 2 && sel2 == 2)) {
        icon1.style.opacity = 0
        icon2.style.opacity = 0
        icon3.style.opacity = 1
        icon4.style.opacity = 0
        icon5.style.opacity = 0
        icon6.style.opacity = 0
        icon7.style.opacity = 0
        icon8.style.opacity = 0
    } else if ((sel1 == 1 && sel2 == 3) || ( sel1 == 2 && sel2 == 3)) {
        icon1.style.opacity = 0
        icon2.style.opacity = 0
        icon3.style.opacity = 0
        icon4.style.opacity = 1
        icon5.style.opacity = 0
        icon6.style.opacity = 0
        icon7.style.opacity = 0
        icon8.style.opacity = 0
    } else if (sel1 == 0 && sel2 == 3) {
        icon1.style.opacity = 0
        icon2.style.opacity = 0
        icon3.style.opacity = 0
        icon4.style.opacity = 0
        icon5.style.opacity = 1
        icon6.style.opacity = 0
        icon7.style.opacity = 0
        icon8.style.opacity = 0
    } else if (sel1 == 0 && sel2 == 2) {
        icon1.style.opacity = 0
        icon2.style.opacity = 0
        icon3.style.opacity = 0
        icon4.style.opacity = 0
        icon5.style.opacity = 0
        icon6.style.opacity = 1
        icon7.style.opacity = 0
        icon8.style.opacity = 0
    } else if (sel1 == 0 && sel2 == 1) {
        icon1.style.opacity = 0
        icon2.style.opacity = 0
        icon3.style.opacity = 0
        icon4.style.opacity = 0
        icon5.style.opacity = 0
        icon6.style.opacity = 0
        icon7.style.opacity = 1
        icon8.style.opacity = 0
    } else if (sel1 == 0 && sel2 == 0) {
        icon1.style.opacity = 0
        icon2.style.opacity = 0
        icon3.style.opacity = 0
        icon4.style.opacity = 0
        icon5.style.opacity = 0
        icon6.style.opacity = 0
        icon7.style.opacity = 0
        icon8.style.opacity = 1
    }
}

var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [ -2000000, -1000000,-500000, 1, 1000000, 2000000, 4000000]

    div.innerHTML = '<h2 style="margin-top:0">Selisih Upah <Br>dengan Biaya Hidup</h2>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background-color:' + color(grades[i]) + '"></i> ' +
            ((grades[i] == -2000000) ? '<2.000.000' : ((grades[i] == 1) ? '0' : grades[i].toLocaleString('de-DE')))            
            + (grades[i + 1] ? ((grades[i+1]==1) ? ' &ndash; 0' :' &ndash; '
            + grades[i + 1].toLocaleString('de-DE')) + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


//COPYRIGHT 2020 LOUIS LUGAS WICAKSONO
