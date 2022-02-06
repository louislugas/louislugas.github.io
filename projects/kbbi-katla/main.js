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

var letterinput = $(".letterinput")
var letter1st, letter2nd, letter3rd, letter4th, letter5th;

d3.csv(url)
    .then((data) => {
        submit.on("click", () => {

            letter1st = letter1.val().toLowerCase()
            letter2nd = letter2.val().toLowerCase()
            letter3rd = letter3.val().toLowerCase()
            letter4th = letter4.val().toLowerCase()
            letter5th = letter5.val().toLowerCase()
            letterinc = letincl.val().toLowerCase()
            letterexc = letexcl.val().toLowerCase()
            console.log(letter1st, letter2nd, letter3rd, letter4th, letter5th)

            const filtered = data.filter((d) => {
                return d.daftarkata.slice(0,1).match(letter1st)
                && d.daftarkata.slice(1,2).match(letter2nd)
                && d.daftarkata.slice(2,3).match(letter3rd)
                && d.daftarkata.slice(3,4).match(letter4th)
                && d.daftarkata.slice(5,5).match(letter5th)
            })

            const include = filtered.filter((d) => {
                let inclArray = letterinc.split("")
                let inclRegex = new RegExp(inclArray.join("|"))
                return d.daftarkata.match(inclRegex)
            })

            const exclude = include.filter((d) => {
                let negate1 = '[^'
                let negate2 = ']'
                let negate = negate1.concat(letterexc).concat(negate2)
                console.log(negate)
                let exclRegex = new RegExp(negate)
                console.log(exclRegex)
                return d.daftarkata.match(exclRegex)
            })

            console.log(filtered)
            console.log(include)
            console.log(exclude)


        })        
    })