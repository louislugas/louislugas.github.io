var $slide = $('.slide-tahun');
var $tahun  = $('.tahun');
var val = $slide.val();
var url1 = "/projects/peta-penurunan-tanah/img/seq/export_0000";
var url2 = "/projects/peta-penurunan-tanah/img/seq/export_000";
var sub = document.getElementsByClassName('subsiden');
var $play = $('.play');
var $prev = $('.prev');
var $next = $('.next');

var count = 0;



play();

$play.on('click', function() {
    count = 0;
    $slide.val(0);
    play()
})

$next.on('click', function() {
    val = $slide.val();
    if ( val == 0 ) {
        var slide = setInterval(function(){
          // whatever code
          $slide[0].stepUp(1);
          val = $slide.val();
          $tahun.html(parseInt(val)+1997);
          if ( val == 10 ) {
              clearInterval(slide);
            }
          if (val < 10 ) {
              sub[0].src = url1 + val + '.png';
          } else if (val > 9) {
              sub[0].src = url2 + val + '.png';
          }
      }, 50);
  } else if ( val == 10 ) {
      var slide = setInterval(function(){
        $slide[0].stepUp(1);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
        if ( val == 20 ) {
            clearInterval(slide);
          }
        if (val < 10 ) {
            sub[0].src = url1 + val + '.png';
        } else if (val > 9) {
            sub[0].src = url2 + val + '.png';
        }
    }, 50);
} else if ( val == 20 ) {
    var slide = setInterval(function(){
      $slide[0].stepUp(1);
      val = $slide.val();
      $tahun.html(parseInt(val)+1997);
      if ( val == 28 ) {
          clearInterval(slide);
        }
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
  }, 50);
} else if ( val == 28 ) {
    var slide = setInterval(function(){
      $slide[0].stepUp(1);
      val = $slide.val();
      $tahun.html(parseInt(val)+1997);
      if ( val == 53 ) {
          clearInterval(slide);
        }
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
  }, 50);
}
})

$prev.on('click', function() {
    val = $slide.val();
    if ( val == 53 ) {
        var slide = setInterval(function(){
          $slide[0].stepDown(1);
          val = $slide.val();
          $tahun.html(parseInt(val)+1997);
          if ( val == 28 ) {
              clearInterval(slide);
            }
          if (val < 10 ) {
              sub[0].src = url1 + val + '.png';
          } else if (val > 9) {
              sub[0].src = url2 + val + '.png';
          }
      }, 50);
  } else if ( val == 28 ) {
      var slide = setInterval(function(){
        $slide[0].stepDown(1);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
        if ( val == 20 ) {
            clearInterval(slide);
          }
        if (val < 10 ) {
            sub[0].src = url1 + val + '.png';
        } else if (val > 9) {
            sub[0].src = url2 + val + '.png';
        }
    }, 50);
} else if ( val == 20 ) {
    var slide = setInterval(function(){
      $slide[0].stepDown(1);
      val = $slide.val();
      $tahun.html(parseInt(val)+1997);
      if ( val == 10 ) {
          clearInterval(slide);
        }
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
  }, 50);
} else if ( val == 10 ) {
    var slide = setInterval(function(){
      $slide[0].stepDown(1);
      val = $slide.val();
      $tahun.html(parseInt(val)+1997);
      if ( val == 0 ) {
          clearInterval(slide);
        }
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
  }, 50);
}
})



function play() {
    count = 0;
    var slide = setInterval(function(){
      // whatever code
      $slide[0].stepUp(1);
      val = $slide.val();
      $tahun.html(parseInt(val)+1997);
      //console.log(count)
      if ( count == 53 ) clearInterval(slide);
      count++;
      if (val < 10 ) {
          sub[0].src = url1 + val + '.png';
      } else if (val > 9) {
          sub[0].src = url2 + val + '.png';
      }
  }, 50);

}

$slide.on('change', function() {
    val = $slide.val();
    if ( val <= 5 ) {
        $slide.val(0);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
    } else if ( val > 5 && val <= 15 ) {
        $slide.val(10);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
    } else if ( val > 15 && val <= 24 ) {
        $slide.val(20);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
    } else if ( val > 24 && val <= 40 ) {
        $slide.val(28);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
    } else if ( val > 40 && val <= 53 ) {
        $slide.val(53);
        val = $slide.val();
        $tahun.html(parseInt(val)+1997);
    }
    if (val < 10 ) {
        sub[0].src = url1 + val + '.png';
    } else if (val > 9) {
        sub[0].src = url2 + val + '.png';
    }
})

$slide.on('input', function() {
    var val = $slide.val();
    $tahun.html(parseInt(val)+1997);
    if (val < 10 ) {
        sub[0].src = url1 + val + '.png';
    } else if (val > 9) {
        sub[0].src = url2 + val + '.png';
    }
    //console.log(val);
})

var width = $slide.width();
var width2 = $('.container').width()

var svg = d3.select('.container')
    .append('svg')
    .attr('width', width2 )
    .attr('height', 850 )
    .attr('id', 'svg');

var data = [0,10,20,28,53];

var selisih = (width2 - width) /2 ;

var mul = ((width - 18) / 53);

svg
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', d => d * mul +39)
    .attr('x2', d => d * mul +39)
    .attr('y1', 765 )
    .attr('y2', 785 )
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('stroke-linecap', 'round');

svg
    .selectAll('#year')
    .data(data)
    .enter()
    .append('text')
    .attr('id', 'year')
    .attr('x', d => d * mul + 39 )
    .attr('y', 810)
    .text(d => d + 1997)
    .attr('text-anchor', 'middle')

var legend = [0,1,2,3,4]

var color = d3.scaleLinear()
    .domain(legend) // MENENTUKAN TITIK STOP WARNA
    .range(["#FFF5F0", "#FCBEA5","#FB7050", "#D32020", "#67000D" ]); // MENENTUKAN WARNA TIAP TITIK

svg
    .selectAll('#legend')
    .data(legend)
    .enter()
    .append('text')
    .attr('id', 'year')
    .attr('x', 95 )
    .attr('y', d => d * 30 + 538)
    .text(d => parseInt(d+1)+ " - " + parseInt(d+2) + " m")
    .attr('text-anchor', 'middle')

svg
    .append('text')
    .attr('id', 'year')
    .attr('x', 75 )
    .attr('y', 500)
    .text('LEGENDA')
    .style('font-weight', '900')
    .attr('text-anchor', 'middle')

svg
    .selectAll('rect')
    .data(legend)
    .enter()
    .append('rect')
    .attr('x', 40 )
    .attr('y', d => d * 30 + 520)
    .attr('width', 25)
    .attr('height', 25)
    .style('fill', d => color(d))
    .style('filter', 'brightness(0.8) contrast(1.4)')
    .style('opacity', 0.8)
    .style('mix-blend-mode', 'multiply')
    .style('stroke', 'black')
    .style('stroke-width',1)
    .attr('text-anchor', 'middle')
