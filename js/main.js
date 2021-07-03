$(document).ready(function () {
    mybutton = document.getElementById("myBtn");
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { //button will be visible after scrolling 20px from top
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    function sum(obj) {
        return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0);
    }

    function random_rgba() {
        var o = Math.round,
            r = Math.random,
            s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.3 + ')';
    }

    function random_rgba1() {
        var o = Math.round,
            r = Math.random,
            s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.8 + ')';
    }

    $("#frqchk").click(function () {
        var maintxt = $("#msg").val();
        maintxt = maintxt.replace(/\য়/gm, "য়");
        maintxt = maintxt.replace(/\ড়/gm, "ড়");
        maintxt = maintxt.replace(/\র‍/gm, "র");
        maintxt = maintxt.replace(/\ঢ়/gm, "ঢ়");
        maintxt = maintxt.replace(/(\r\n|\n|\r)|[ৰৱ৷\’\-\–\—\…\‌\]|[\(\.\)\/\:]/gm, "");
        var words = maintxt.split(" ");
        var splitted = maintxt.split(" ").join("").split("");
        var obj1 = {};

        for (var i = 0; i < splitted.length; ++i) {
            if (!obj1[splitted[i]])
                obj1[splitted[i]] = 0;
            ++obj1[splitted[i]];
        }

        const sortedObj = Object.fromEntries(
            Object.entries(obj1).sort(([, a], [, b]) => b - a)
        );

        var total = sum(sortedObj);
        var arrayofvalues = Object.values(sortedObj);

        for (var i = 0; i < arrayofvalues.length; i++) {
            arrayofvalues[i] = ((arrayofvalues[i] * 100) / total).toFixed(2);
        }

        var c = [];
        var d = [];
        for (var i = 0; i < 61; i++) {
            c[i] = random_rgba();
            d[i] = random_rgba1();
        }
        $("#barChart").css({"visibility":"visible"});
        var ctxB = $("#barChart")[0].getContext('2d');
        Chart.defaults.global.defaultFontColor = 'white';
        var myBarChart = new Chart(ctxB, {
            type: 'bar',
            data: {
                labels: Object.keys(sortedObj),
                datasets: [{
                    label: 'Relative Frequency(%)',
                    data: arrayofvalues,
                    backgroundColor: c,
                    borderColor: d,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var f = 0;
        for (x in sortedObj) {
            sortedObj[x] += " (" + arrayofvalues[f++] + "%)";
        }

        $("#freq").val(JSON.stringify(sortedObj, null, 4));
        $("#sum").val("Total number of Characters without whitespace: " + splitted.length);
        $("#word").val("Total number of words: " + words.length);
    });

});
