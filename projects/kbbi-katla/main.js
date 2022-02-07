var url = 'limakata.csv'

var
    letter1 = $("#fname1"),
    letter2 = $("#fname2"),
    letter3 = $("#fname3"),
    letter4 = $("#fname4"),
    letter5 = $("#fname5"),
    letincl = $("#include"),
    letexcl = $("#exclude");

var submit = $(".submit")

var include, exclude;

var letterinput = $(".letterinput")
var letter1st, letter2nd, letter3rd, letter4th, letter5th;

var ul1 = $("#ul-1"),
    ul2 = $("#ul-2"),
    ul3 = $("#ul-3");

d3.csv(url)
    .then((data) => {
        submit.on("click", () => {

            // letter input
            letter1st = letter1.val().toLowerCase()
            letter2nd = letter2.val().toLowerCase()
            letter3rd = letter3.val().toLowerCase()
            letter4th = letter4.val().toLowerCase()
            letter5th = letter5.val().toLowerCase()
            letterinc = letincl.val().toLowerCase()
            letterexc = letexcl.val().toLowerCase()
            //console.log(letter1st, letter2nd, letter3rd, letter4th, letter5th)

            // filter by exact letter position
            const filtered = data.filter((d) => {
                return d.daftarkata.slice(0,1).match(letter1st)
                && d.daftarkata.slice(1,2).match(letter2nd)
                && d.daftarkata.slice(2,3).match(letter3rd)
                && d.daftarkata.slice(3,4).match(letter4th)
                && d.daftarkata.slice(4,5).match(letter5th)
            })

            // filter by any letter included
            let inclArray = letterinc.split("")
            let inclArray2= inclArray.map((d) => {
                let inc1 = '['
                let inc2 = ']'
                let inc = inc1.concat(d).concat(inc2)
                return inc
            })
            let len = inclArray2.length

            include = filtered

            for (let x = 0; x < len; x++ ) {
                include = include.filter((d) => {
                    let inclRegex = new RegExp(inclArray2[x],'g')
                    return d.daftarkata.match(inclRegex)
                })
            }

            // filter by any letter excluded
            let exclArray = letterexc.split("")
            let exclArray2= exclArray.map((d) => {
                let exc1 = '['
                let exc2 = ']'
                let exc = exc1.concat(d).concat(exc2)
                return exc
            })
            let lenx = exclArray2.length

            exclude = include

            for (let x = 0; x < lenx; x++ ) {
                exclude = exclude.filter((d) => {
                    let exclRegex = new RegExp(exclArray2[x],'g')
                    return !d.daftarkata.match(exclRegex)
                })
            }
                
            //console.log(filtered)
            //console.log(include)
            //console.log(exclude)

            let printlen = exclude.length
            let divide = Math.ceil(printlen/3)
            let len1 = divide
            let len2 = 2 * divide
            let len3 = printlen - (len2)
            //console.log(printlen,len1, len2, len3)

            $('.list').remove()

            for (let i = 0; i < len1; i++) {
                ul1.append('<li>' + exclude[i].daftarkata)
                $('li').addClass('list')
            }

            for (let i = len1; i < len2; i++) {
                ul2.append('<li>' + exclude[i].daftarkata)
                $('li').addClass('list')
            }

            for (let i = len2; i < printlen; i++) {
                ul3.append('<li>' + exclude[i].daftarkata)
                $('li').addClass('list')
            }

        


        })        
    })