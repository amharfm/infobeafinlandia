var perpus;

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
}

function filters(){
    filterSelection("all")

    // Add active class to the current button (highlight it)
    var btnContainer = document.getElementById("myBtnContainer");
        var btns = btnContainer.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}




function muat (){

    function cek_IE(iftrue,iffalse){
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        var ua = navigator.userAgent || navigator.vendor || window.opera;
        var isInstagram = (ua.indexOf('Instagram') > -1) ? true : false;
        // https://supergeekery.com/blog/detecting-the-instagram-in-app-browser

        if (isIE){
            iftrue();
        } else {
            if (isInstagram) {
                window.document.body.classList.add('instagram-browser');
                // alert(navigator.appVersion);
                iftrue();
            } else {
                iffalse();
            }
        }
    }

    
    function bikin_semua(p){
        //karosel
        p.karosel.tabel.isi_tautan.forEach(function(i){
            document.getElementById("karosel").children[0].children[0].appendChild(document.createElement('td')).innerHTML = "<a href='"+i.link+"'>"+i.teks+"</a>";
        })

        //tag
        p.katakunci.forEach(function(k){
            if (k.active){
                document.getElementById("myBtnContainer").innerHTML += "<button class='btn active' onclick='filterSelection("+'\"'+k.selection.trim()+'\"'+")'> "+k.teks+"</button>";
            } else {
                document.getElementById("myBtnContainer").innerHTML += "<button class='btn' onclick='filterSelection("+'\"'+k.selection+'\"'+")'>"+k.teks+"</button>";
            }
        })

        //FAQ
        var num = 0;
        p.faq.forEach(function(k){
            //kepala
            document.getElementById('kontainer').appendChild(document.createElement('div')).id = "faq_"+num;
            document.getElementById("faq_"+num).classList.add('filterDiv');
            k.tag.forEach(function(t){
                document.getElementById("faq_"+num).classList.add(t);
                document.getElementById("faq_"+num).classList.add('show');
            }) 

            //accordion
            document.getElementById("faq_"+num).appendChild(document.createElement('div')).id = "acc_"+num;
            if (k.warna_acc) document.getElementById("acc_"+num).style = k.warna_acc;
            document.getElementById("acc_"+num).classList.add( 'accordion');
            document.getElementById("acc_"+num).innerHTML = "> "+k.pertanyaan;

            //panel
            document.getElementById("faq_"+num).appendChild(document.createElement('div')).id = "panel_"+num;
            document.getElementById("panel_"+num).classList.add("panel");
            if (k.isi_baris) {
                k.isi_baris.forEach(function(i){
                    document.getElementById("panel_"+num).appendChild(document.createElement("p")).innerHTML = i;
                })
            } else {
                document.getElementById("panel_"+num).innerHTML = k.isi_html;
            }

            //fungsi
            document.getElementById("acc_"+num).addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });

            num++;
        })

        //footer
        var nom = 0;
        for (var f in p.footer){
            //kepala
            document.getElementById('kontainer').appendChild(document.createElement('div')).id = "foot_"+nom;
            document.getElementById("foot_"+nom).classList.add('filterDiv');
            p.footer[f].tag.forEach(function(t){
                document.getElementById("foot_"+nom).classList.add(t);
                document.getElementById("foot_"+nom).classList.add('show');
            }) 

            //accordion
            document.getElementById("foot_"+nom).appendChild(document.createElement('div')).id = "accr_"+nom;
            if (f.warna_acc) document.getElementById("accr_"+nom).style = k.warna_acc;
            document.getElementById("accr_"+nom).classList.add( 'accordion');
            document.getElementById("accr_"+nom).innerHTML = "> "+p.footer[f].pertanyaan;

            //panel
            document.getElementById("foot_"+nom).appendChild(document.createElement('div')).id = "paneel_"+nom;
            document.getElementById("paneel_"+nom).classList.add("panel");
            if (p.footer[f].isi_tautan) {
                p.footer[f].isi_tautan.forEach(function(t){
                    if (t.link){
                        document.getElementById("paneel_"+nom).innerHTML += "<li/><a href='"+t.link+"'>"+t.teks+"</a></li>"
                    } else {
                        document.getElementById("paneel_"+nom).innerHTML += "<li>"+t.teks+"</li>";
                    }
                })
            } else { }

            //fungsi
            document.getElementById("accr_"+nom).addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });

            nom++;
        }

        cek_IE(
            function(){
                document.getElementById("panel_0").innerHTML = "<img src='./proses.jpg'>";
            },
            function(){
                mermaid.initialize({
                    startOnLoad:true,
                    theme: 'forest'
                });
                mermaid.init();
            }
        )
    }
    
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            perpus = JSON.parse(this.responseText);
            AM.memuat(false);
            bikin_semua(perpus);
            AM.memuat(false);
            filters();
            AM.memuat(false);
        }
        }
        xmlhttp.open("GET", "./perpustakaan.json", true);
        xmlhttp.send();
        AM.memuat(false);
}
    
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}