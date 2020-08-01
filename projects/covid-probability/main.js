//RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////////
var container = document.querySelector('.container')          //
var w = container.offsetWidth                                 //
var h = container.offsetHeight                                //
var gw, gh;                                                   //
var font, space, mult, left, top;
                                                              //
//console.log( 'initial size','width' ,w, 'height', h)        //
                                                              //
var radius // infographic radius                              //
                                                              //
if ( w < h ) { // MOBILE                                      //
    container.style.height = '600px'                          //
    container.style.width = '330px'                           //
    w = container.offsetWidth                                 //
    h = container.offsetHeight                                //
    radius = w * 0.46                                         //
    gw = w/2                                                  //
    gh = h/2                                                  //
    font = '9pt'
    space = 5
    mult = 17
    left = 32
    fromtop = 15
                                                              //
} else if ( w > h ) { // DESKTOP                              //
    container.style.height = '850px'                          //
    container.style.width = '560px'                           //
    w = container.offsetWidth                                 //
    h = container.offsetHeight                                //
    radius = w * 0.46                                         //
    gw = w/2                                                  //
    gh = h/2 + 50                                             //
    font = '13pt'
    space = 5
    mult = 25
    left = 55
    fromtop = 0
                                                              //
};                                                            //
//END RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////


//console.log(w)
//console.log(h)
//console.log(radius)

var svg = d3.select('.container')
    .append('svg')
    .attr('id', 'cont')
    .attr('width', w)
    .attr('height', h)

var bg = svg.append("rect")
    .attr('width', '100%')
    .attr('height', '100%')
    .style('fill', '#262626')

var g1 = svg.append('g')
.attr('transform', 'translate('+gw+','+gh+')')

var probIndo = 4,
    probDki = 21,
    probBali = 6,
    probJatim = 4;

var prob;

var sample = 10000
var circle = []

var legendData = [
    {
        text: 'Positif Covid-19',
        color: 'red',
        r: 0.015 * radius
    },
    {
        text: 'Sampel populasi',
        color: '#138FB3',
        r: 0.007 * radius
    },
    {
        text: 'Subjek',
        color: 'orange',
        r: 0.02 * radius
    },
    {  
        text: 'Area probabilitas interaksi',
        color: 'orange',
        fillopacity: 0.2,
        r: 0.05* radius,
        strokewidth: 2,
        stroke: 'yellow',
        strokeopacity: 1,
        strokedasharray: 4
    }
]

var legend = g1
    .selectAll('.legendc')
    .data(legendData)
    .enter()
    .append('circle')
    .attr('class','legendc')
    .attr('cx', left - radius)
    .attr('cy', (d,i) => i * mult + radius + fromtop)
    .attr('r', d => d.r)
    .style('fill', d => d.color)
    .style('fill-opacity', d => d.fillopacity)
    .style('stroke-width', d => d.strokewidth)
    .style('stroke-dasharray', d => d.strokedasharray)
    .style('stroke', d => d.stroke)
    .style('stroke-opacity', d => d.strokeopacity)

var legendtext = g1
    .selectAll('.legendt')
    .data(legendData)
    .enter()
    .append('text')
    .attr('class','legendt')
    .attr('x', left - radius + mult)
    .attr('y', (d,i) => i * mult + radius + space + fromtop)
    .style('fill', 'white')
    .style('font-size', font)
    .style('font-family', 'Lato')
    .text(d => d.text)


//////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded",() => {
    sampling()
})

//////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////

function reload() {
    remove()
    sampling()
}

function remove() {
    var element = document.getElementById('group')
    //console.log(element)
    element.remove()
}

function sampling() {

    var sel = document.getElementById('provinsi')
    var opt = sel.options[sel.selectedIndex]

    if (opt.value == 'indonesia') {
        prob = probIndo;
    } else if (opt.value == 'jakarta') {
        prob = probDki
    } else if (opt.value == 'jatim') {
        prob = probJatim
    } else if (opt.value == 'bali') {
        prob = probBali
    }

    //console.log(opt.value)
    //console.log(prob)

    document.getElementById('title').innerHTML = '<span class="highlight">' + prob + '</span> dari <span class="highlight">10.000 </span> orang<br>di <span class="highlight">'+ opt.text +'</span> positif<br> Terjangkit Covid-19' 
    
    var probArray = d3.range(prob).map(() => {
        var angle = Math.random() * Math.PI * 2;
        var rad = Math.sqrt(~~(Math.random() * radius * radius));
        return {
            value: 0,
            cx: Math.cos(angle) * rad,
            cy: Math.sin(angle) * rad,
            r: 4
        };
    });

    var sampleArray = d3.range(sample-prob).map(() => {
        var angle = Math.random() * Math.PI * 2;
        var rad = Math.sqrt(~~(Math.random() * radius * radius));
        return {
            value: 1,
            cx: Math.cos(angle) * rad,
            cy: Math.sin(angle) * rad,
            r: 1
        };
    });

    //console.log(probArray)
    //console.log(sampleArray)

    const circleArray = sampleArray.concat(probArray)
    const shuffleArray = circleArray.sort(() => Math.random() -0.5)

    //console.log(shuffleArray)

    var red = 0.015 * radius
    var blue = 0.007 * radius

    var g = svg.append('g')
    .attr('transform', 'translate('+gw+','+gh+')')
    .attr('id', 'group')

    var c = g
    .selectAll('circle')
    .data(shuffleArray)
    .enter()
    .append('circle')
    .attr('id', 'c')
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r',  d => ( d.value == 0 ) ? red : blue)
    .style('fill', d => ( d.value == 0 ) ? 'red' : '#138FB3')
    .style('opacity', d => ( d.value == 0 ) ? 1 : 0.6);

    var p = g
    .append('circle')
    .attr('id', 'p')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0.02 * radius)
    .style('fill', 'orange')

    var range = g
    .append('circle')
    .attr('id', 'g')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0.05* radius)
    .style('fill', 'orange')
    .style('fill-opacity', 0.2)
    .style('stroke-width', 2)
    .style('stroke-dasharray', 4)
    .style('stroke', 'yellow')
    .style('stroke-opacity',1)

}


