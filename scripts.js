const socket = new WebSocket('wss://rbx.fun:8081');
var connected = false
var globalPage = "index";
var userLoggedIn = "";

// displayAlert(".quote-save-success");

function displayAlert(alertBar) {
  var $ab = $(alertBar);
  var barHeight = $ab.height();
  var startingPos = barHeight * -2;
  $ab.css({
    visibility: "visible",
    bottom: startingPos
  });

  $ab.animate(
    {
      bottom: -16
    },
    400,
    function() {
      setTimeout(function(){
        $ab.animate(
        {
          bottom: startingPos
        },
        400,
        function() {
         $ab.css({visibility: "hidden"})
        }
      );}, 2000);
      
    }
  );
}


function indexLoaded(content) {
    document.querySelector("#site-content > section > div > div > div > button").onclick = function() {
        $('#loginModal').modal('toggle');
    }
    document.querySelector("#site-content > div.container.marketing.py-5 > div > div.col-lg-6 > button").onclick = function() {
        $('#loginModal').modal('toggle');
    }
    document.querySelector("#site-content > div.album.py-5.bg-light > div > div > div:nth-child(2) > div:nth-child(2) > button").onclick = function() {
        $('#loginModal').modal('toggle');
    }
    document.querySelector("#loginModal > div > div > div.modal-body > div > input").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector("#loginModal > div > div > div.row > div:nth-child(2) > button").click();
        }
    });
    document.querySelector("#loginModal > div > div > div.row > div:nth-child(2) > button").onclick = function() {
        var usernameInput = document.querySelector("#loginModal > div > div > div.modal-body > div > input");
        if (usernameInput.value != "" && usernameInput.value.length >= 3) {
            var username = usernameInput.value;
            usernameInput.value = "";
            socket.send("JSON "+JSON.stringify({'method': 'login', 'username': username}));
            $('#loginModal').modal('toggle');
        }
    }
    socket.send('[client] [load] => index');
}

function earnloaded(content) {
    socket.send('[client] [load] => earn');
    var adgate = document.querySelector("button#adgate");
    var ayet = document.querySelector("button#ayet");
    var adgem = document.querySelector("button#adgem");
    var offertoro = document.querySelector("button#offertoro");

    var adgateIframe = document.querySelector("iframe#adgate");
    var ayetIframe = document.querySelector("iframe#ayet");
    var adgemIframe = document.querySelector("iframe#adgem");
    var offertoroIframe = document.querySelector("iframe#offertoro");

    adgate.onclick = function() {
        adgate.classList.add('isClicked');
        ayet.classList.remove('isClicked');
        adgem.classList.remove('isClicked');
        offertoro.classList.remove('isClicked');

        adgateIframe.width = "100%";
        adgateIframe.height = "90%";
        ayetIframe.width = "0%";
        ayetIframe.height = "0%";
        adgemIframe.width = "0%";
        adgemIframe.height = "0%";
        offertoroIframe.width = "0%";
        offertoroIframe.height = "0%";
    }
    ayet.onclick = function() {
        ayet.classList.add('isClicked');
        adgate.classList.remove('isClicked');
        adgem.classList.remove('isClicked');
        offertoro.classList.remove('isClicked');

        adgateIframe.width = "0%";
        adgateIframe.height = "0%";
        ayetIframe.width = "100%";
        ayetIframe.height = "90%";
        adgemIframe.width = "0%";
        adgemIframe.height = "0%";
        offertoroIframe.width = "0%";
        offertoroIframe.height = "0%";
    }
    adgem.onclick = function() {
        adgem.classList.add('isClicked');
        adgate.classList.remove('isClicked');
        ayet.classList.remove('isClicked');
        offertoro.classList.remove('isClicked');

        adgateIframe.width = "0%";
        adgateIframe.height = "0%";
        ayetIframe.width = "0%";
        ayetIframe.height = "0%";
        adgemIframe.width = "100%";
        adgemIframe.height = "90%";
        offertoroIframe.width = "0%";
        offertoroIframe.height = "0%";
    }
    offertoro.onclick = function() {
        offertoro.classList.add('isClicked');
        adgate.classList.remove('isClicked');
        ayet.classList.remove('isClicked');
        adgem.classList.remove('isClicked');

        adgateIframe.width = "0%";
        adgateIframe.height = "0%";
        ayetIframe.width = "0%";
        ayetIframe.height = "0%";
        adgemIframe.width = "0%";
        adgemIframe.height = "0%";
        offertoroIframe.width = "100%";
        offertoroIframe.height = "90%";
    }
    document.querySelector("#site-content > div.album.py-5.bg-light > div > div.my-3.p-3.bg-white.rounded.shadow-sm.text-left.maincard > div > div.col-md-3.text-center > a.btn.btn-danger.text-white.waves-effect.waves-light.extra-btn").onclick = function() {
        socket.send('youtube');
        var win = window.open('https://www.youtube.com/channel/UC0M4WIqaVGH-OMPMnrHuq3A?sub_confirmation=1', '_blank');
        win.focus();
        socket.send('[client] [load] => earn');
    }
    document.querySelector("#site-content > div.album.py-5.bg-light > div > div.my-3.p-3.bg-white.rounded.shadow-sm.text-left.maincard > div > div.col-md-3.text-center > a.btn.bg-purple.text-white.waves-effect.waves-light.extra-btn").onclick = function() {
        socket.send('discord');
        var win = window.open('https://discord.gg/GqAjbD4Y', '_blank');
        win.focus();
        socket.send('[client] [load] => earn');
    }
}

function withdrawloaded(content) {
    socket.send('[client] [load] => withdraw');
    document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(1) > div > a.btn.btn-danger.text-white.waves-effect.waves-light").onclick = function() {
        socket.send('LOGOUT');
        contentElement = document.querySelector("#site-content");
        loadPage(contentElement, "index");
    }
    document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(1) > div > a.btn.bg-purple.text-white.waves-effect.waves-light").onclick = function() {
        socket.send('CLAIM_DAILY');
    }
}

function inventoryloaded(content) {
    socket.send('[client] [load] => inventory');
    document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button").onclick = function() {
        $('#starterChestModal').modal('toggle');
    }

    var starterOpen = document.querySelector("#starterChestModal > div > div > div.modal-body > section > button");
    starterOpen.onclick = function () {
        starterOpen.classList.add("clicked");
        socket.send('STARTER_OPENED');
        setTimeout(function () {
            Swal.fire({
                imageUrl: 'assets/potion.png',
                imageHeight: 180,
                imageWidth: 150,
                imageAlt: 'A tall image',
                title: 'YOU WON A POWERUP',
                text: 'DOUBLE ROBUX EARNINGS!',
                footer: '<a style="color:orange;font-size: 22px;">LEGENDARY ITEM (0.034% CHANCE)</a>'
            });
            $('#starterChestModal').modal('toggle');
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div.col-md-3.chest-card.fade-in-200 > div:nth-child(2) > button").remove();
        }, 1200);
    }
}

function giveawayloaded(content) {
    socket.send('[client] [load] => giveaway');
}

function inviteloaded(content) {
    socket.send('[client] [load] => invite');
}

function promocodesloaded(content) {
    socket.send('[client] [load] => promocodes');
    document.querySelector("body > main > div.album.py-5.bg-light > div > div > div > div:nth-child(1) > div.row > div:nth-child(2) > button").onclick = function(){
        location.href = '/#/invite';
    }
    document.querySelector("body > main > div.album.py-5.bg-light > div > div > div > div:nth-child(1) > div.row > div:nth-child(1) > button").onclick = function(){
        location.href = '/#/earn';
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var db = true;

function generate(divImages) {
    document.querySelector('.raffle-roller-container').innerHTML = '';
	$('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');
	for(var i = 0;i < 101; i++) {
	    var element = divImages[3].cloneNode();
	    element.id = "CardNumber"+i.toString();
	    element.classList.add("item","class_red_item");
		var randed = randomInt(1,1000);
		if(randed < 100) {
		    element = divImages[0].cloneNode();
    	    element.id = "CardNumber"+i.toString();
    	    element.classList.add("item","class_red_item");
		} else if(randed < 200) {
			element = divImages[1].cloneNode();
    	    element.id = "CardNumber"+i.toString();
    	    element.classList.add("item","class_red_item");
		}
		 else if(randed > 500) {
			element = divImages[2].cloneNode();
    	    element.id = "CardNumber"+i.toString();
    	    element.classList.add("item","class_red_item");
		}
		$(element.outerHTML).appendTo('.raffle-roller-container');
	}
	/*
	setTimeout(function() {
		if(randed2 == 2) {
			goRoll(items.middle.skin, items.middle.img);
		} else if(randed2 == 1) {
			goRoll(items.super.skin, items.super.img);
		} else {
			goRoll(items.simple.skin, items.simple.img);
		}
	}, 500);
	*/
}
var images = ['https://cdn.discordapp.com/attachments/733271936431292478/781921726916460574/1.png', 'https://cdn.discordapp.com/attachments/733271936431292478/781921728254181407/25.png','https://cdn.discordapp.com/attachments/733271936431292478/781920840034811925/1000.png', 'https://cdn.discordapp.com/attachments/733271936431292478/781921404982919168/5000.png'];
var divImages = [];
for (i in images) {
    image_url = images[i];
    var div = document.createElement('div');
    div.style.backgroundImage = "url('"+image_url+"')";
    divImages.push(div);
}
    
function eventsloaded(content) {
    socket.send('[client] [load] => events');
    document.querySelector("#openChestButtonCusYes").onclick = function() {
        if (db) {
            db = false;
            socket.send('OPENING EVENT CHEST MOthERFuCKER');
        }
    }
    
    document.querySelector("#site-content > div > div:nth-child(2) > div > div:nth-child(2) > div > div.row > div > button").onclick = function() {
        if (db) {
            db = false;
            generate(divImages);
            setTimeout(function() {
                var winAmounts = [
                        {image: 'https://cdn.discordapp.com/attachments/733271936431292478/781921404982919168/5000.png', amount:'5000'},
                        {image: 'https://cdn.discordapp.com/attachments/733271936431292478/781920840034811925/1000.png', amount:'1000'},
                        {image: 'https://cdn.discordapp.com/attachments/733271936431292478/781921728254181407/25.png', amount:'25'},
                        {image: 'https://cdn.discordapp.com/attachments/733271936431292478/781921726916460574/1.png', amount:'1'}
                    ];
                var randed = randomInt(1,1000);
                var winned = winAmounts[0];
                if(randed < 50) {
    			    winned = winAmounts[3];
        		} else if(randed < 150) {
        			winned = winAmounts[2];
        		}
        		 else if(randed < 500) {
        			winned = winAmounts[1];
        		}
        		$('.raffle-roller-container').css({
            		transition: "all 8s cubic-bezier(.08,.6,0,1)"
            	});
            	$('#CardNumber80').css({
            		"background-image": "url("+winAmounts[3]['image']+")"
            	});
            	$('#CardNumber79').css({
            		"background-image": "url("+winned['image']+")"
            	});
            	setTimeout(function() {
            		$('#CardNumber79').addClass('winning-item');
            		Swal.fire(
                        'Yaaaay!',
                        'You *WOULD* have won '+winned['amount']+' robux',
                        'success'
                    );
            		
            		db = true;
            	}, 8500);
            	$('.raffle-roller-container').css('margin-left', '-6770px');
            }, 500);
        }
    }
}

function loadPage(content, page) {
    globalPage = page;
    console.log("Page: " + globalPage)
    if (page.toLowerCase() != "index") {
        document.querySelector("body > header > nav > div.btn-flex-cst").style.visibility = "visible";
    } else {
        document.querySelector("body > header > nav > div.btn-flex-cst").style.visibility = "hidden";
    }
    if (page.toLowerCase() === "index") {
        $.get('pages/index.txt', function (data) {
            content.innerHTML = data;
            indexLoaded(content);
        })
    } else if (page.toLowerCase() === "earn") {
        $.get('pages/earn.txt', function (data) {
            content.innerHTML = data;
            earnloaded(content);
        })
    } else if (page.toLowerCase() === "withdraw") {
        $.get('pages/withdraw.txt', function (data) {
            content.innerHTML = data;
            withdrawloaded(content);
        })
    } else if (page.toLowerCase() === "inventory") {
        $.get('pages/inventory.txt', function (data) {
            content.innerHTML = data;
            inventoryloaded(content);
        })
    } else if (page.toLowerCase() === "giveaway") {
        $.get('pages/giveaway.txt', function (data) {
            content.innerHTML = data;
            giveawayloaded(content);
        })
    } else if (page.toLowerCase() === "invite") {
        $.get('pages/invite.txt', function (data) {
            content.innerHTML = data;
            inviteloaded(content);
        })
    } else if (page.toLowerCase() === "promocodes") {
        $.get('pages/promocodes.txt', function (data) {
            content.innerHTML = data;
            promocodesloaded(content);
        })
    } else if (page.toLowerCase() === "events") {
        $.get('pages/events.txt', function (data) {
            content.innerHTML = data;
            eventsloaded(content);
        })
    }
}

function loadPageFromHash() {
    Pace.stop();
    Pace.bar.render();
    Pace.start();
    contentElement = document.querySelector("#site-content");
    if (location.hash == "" || location.hash == "/index" || location.hash == "#/index") {
        loadPage(contentElement, "index");
    } else if (location.hash == "/earn" || location.hash == "#/earn") {
        loadPage(contentElement, "earn");
    } else if (location.hash == "/withdraw" || location.hash == "#/withdraw") {
        loadPage(contentElement, "withdraw");
    } else if (location.hash == "/inventory" || location.hash == "#/inventory") {
        loadPage(contentElement, "inventory");
    } else if (location.hash == "/giveaway" || location.hash == "#/giveaway") {
        loadPage(contentElement, "giveaway");
    } else if (location.hash == "/invite" || location.hash == "#/invite") {
        loadPage(contentElement, "invite");
    } else if (location.hash == "/promocodes" || location.hash == "#/promocodes") {
        loadPage(contentElement, "promocodes");
    } else if (location.hash == "/events" || location.hash == "#/events") {
        loadPage(contentElement, "events");
    }
    if (location.hash != "" && location.hash != "#/index" && location.hash != "/index") {
        socket.send('loginCheck');
    }
}

window.addEventListener('hashchange', loadPageFromHash, false);

socket.addEventListener('close', function (event) {
    location.reload();
});

socket.addEventListener('error', function (event) {
    location.reload();
});

socket.addEventListener('open', function (event) {
    connected = true;
    loadPageFromHash()
});

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

socket.addEventListener('message', function (event) {
    if (event.data.startsWith("[NEW] ")) {
        var info = event.data.split("[NEW] ",2)[1];
        
        if (globalPage == "earn") {
            if (info.startsWith("stock=")) {
                var newStock = info.split("stock=",2)[1];
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div:nth-child(1) > div > div > div > h2").innerText = new Intl.NumberFormat('en-US').format(newStock);
            } else if (info.startsWith("offersdone=")) {
                var newOffersdone = info.split("offersdone=",2)[1];
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div.col-12.col-md-4.fade-in-150 > div > div > h2").innerText = new Intl.NumberFormat('en-US').format(newOffersdone);
            } else if (info == "user") {
                var dab = parseInt(document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div.col-12.col-md-4.fade-in-200 > div > div > h2").innerText.replace(",", ""));
                dab += 1;
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div.col-12.col-md-4.fade-in-200 > div > div > h2").innerText = new Intl.NumberFormat('en-US').format(dab);
            }
        } else if (globalPage == "withdraw") {
            if (info.startsWith("stock=")) {
                var newStock = info.split("stock=",2)[1];
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div.col-md-4.fade-in-100 > div > div > h2").innerText = new Intl.NumberFormat('en-US').format(newStock);
            } else if (info.startsWith("offersdone=")) {
                var newOffersdone = info.split("offersdone=",2)[1];
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div.col-md-4.fade-in-150 > div > div > h2").innerText = new Intl.NumberFormat('en-US').format(newOffersdone);
            } else if (info == "user") {
                var dab = parseInt(document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div.col-md-4.fade-in-200 > div > div > h2").innerText.replace(",", ""));
                dab += 1;
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div.col-md-4.fade-in-200 > div > div > h2").innerText = new Intl.NumberFormat('en-US').format(dab);
            }
        }
        if (info.startsWith("offerPush=")) {
            var obj = JSON.parse(info.split("offerPush=",2)[1]);
            console.log('if '+userLoggedIn.toLowerCase()+' == '+obj.username.toLowerCase());
            if (userLoggedIn.toLowerCase() == obj.username.toLowerCase()) {
                document.querySelector("#doneAnOffer > div > div > div.modal-body > div > div > h5 > span").innerText = obj.amount;
                $('#doneAnOffer').modal('show');
            }
        }
        
    }
    
    if (event.data.startsWith("Whalecum ")) {
        if (location.hash == "" || location.hash == "#/index" || location.hash == "/index") {
            contentElement = document.querySelector("#site-content");
            location.hash = "/earn";
            loadPage(contentElement, "earn");
        }
        userLoggedIn = event.data.split(" ")[1];
        console.log("User is logged in as "+userLoggedIn);
    } else if (event.data == "NLI") {
        if (location.hash != "" && location.hash != "#/index" && location.hash != "/index") {
            location.hash = "/index";
        }
    } else if (event.data.startsWith("STATS ")) {
        var obj = JSON.parse(event.data.split("STATS ",2)[1]);
        // re-define locker definitions
        // Example: obj.offerwalls.ayet = "https://d1xkyo9j4r7vnn.cloudfront.net/public/i_fr?it=1139852&key=c627a";
        obj.offerwalls.adgate = "https://d1xkyo9j4r7vnn.cloudfront.net/public/i_fr?it=1011407&key=e8bbf";
        obj.offerwalls.ayet = "https://viral782.com/list/421328";
        obj.offerwalls.adgem = "https://d1xkyo9j4r7vnn.cloudfront.net/public/i_fr?it=1185850&key=9dc9b";
        //obj.offerwalls.offertoro = "";

        if (location.hash == "/events" || location.hash == "#/events") {
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;
            document.querySelector("#site-content > div > div:nth-child(2) > div > div:nth-child(3) > div > h3 > span:nth-child(1)").innerText = 10-obj.event_chest_progress;
            document.querySelector("#site-content > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div").style.width = (obj.event_chest_progress*10).toString()+"%";
        }

        if (location.hash == "/promocodes" || location.hash == "#/promocodes") {
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div > div > div:nth-child(1) > button").onclick = function() {
                if (document.querySelector("#site-content > div.album.py-5.bg-light > div > div > div > div:nth-child(1) > div > input").value != "") {
                    socket.send('JSON '+JSON.stringify({"method":"promocode", "code": document.querySelector("#site-content > div.album.py-5.bg-light > div > div > div > div:nth-child(1) > div > input").value}));
                    document.querySelector("#site-content > div.album.py-5.bg-light > div > div > div > div:nth-child(1) > div > input").value = "";
                }
            }
        }

        if (location.hash == "/invite" || location.hash == "#/invite") {
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;
            document.querySelector("#myInput1").value = "I earned so much robux from https://robuxs.land?ref="+obj.id;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row > div:nth-child(1) > div > div > div > h2").innerText = obj.invitedCount+" Users";
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.my-3.p-3.bg-white.rounded.shadow-sm.text-center.small-card > div > div:nth-child(1) > div.card.align-self-stretch > div > div > h2").innerText = obj.invitedCount+" Users";
            document.querySelector("#button-addon2").onclick = function() {
                document.querySelector("#myInput1").select();
                document.execCommand('copy');
                displayAlert(".quote-save-success");
            }
        }

        if (location.hash == "/giveaway" || location.hash == "#/giveaway") {
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;
            var template = document.querySelector("#site-content > div > div > div > div.fade-in-200.mx-auto > div:nth-child(3) > table > tbody > tr").cloneNode(true);
            document.querySelector("#site-content > div > div:nth-child(2) > div > div.fade-in-200.mx-auto > div:nth-child(3) > table > tbody > tr").remove();
            var templatesHolder = document.querySelector("#site-content > div > div:nth-child(2) > div > div.fade-in-200.mx-auto > div:nth-child(3) > table > tbody");

            if (obj.recentGiveawayWinners[0] != null) {
                rGW1 = template.cloneNode(true);
                rGW1.querySelector("tr > td:nth-child(1) > img").src = "https://www.roblox.com/headshot-thumbnail/image?userId="+obj.recentGiveawayWinners[0].rid+"&width=150&height=150&format=png"
                rGW1.querySelector("tr > td:nth-child(2) > b").innerText = obj.recentGiveawayWinners[0].username
                templatesHolder.appendChild(rGW1);
            }
            if (obj.recentGiveawayWinners[1] != null) {
                rGW2 = template.cloneNode(true);
                rGW2.style.backgroundColor = "rgb(249, 249, 249)";
                rGW2.querySelector("tr > td:nth-child(1) > img").src = "https://www.roblox.com/headshot-thumbnail/image?userId="+obj.recentGiveawayWinners[1].rid+"&width=150&height=150&format=png"
                rGW2.querySelector("tr > td:nth-child(2) > b").innerText = obj.recentGiveawayWinners[1].username
                templatesHolder.appendChild(rGW2);
            }
            if (obj.recentGiveawayWinners[2] != null) {
                rGW3 = template.cloneNode(true);
                rGW3.querySelector("tr > td:nth-child(1) > img").src = "https://www.roblox.com/headshot-thumbnail/image?userId="+obj.recentGiveawayWinners[2].rid+"&width=150&height=150&format=png"
                rGW3.querySelector("tr > td:nth-child(2) > b").innerText = obj.recentGiveawayWinners[2].username
                templatesHolder.appendChild(rGW3);
            }

            document.querySelector("#site-content > div > div:nth-child(2) > div > div.row > div > button").onclick = function() {
                socket.send('joinGiveaway');
            }

            var endTime = obj.giveawayEnd;
            var timeHolder = document.querySelector("#site-content > div > div:nth-child(1) > div > div > div:nth-child(2) > h3");
            var iId = window.setInterval(function() {
                var nowTime = Math.round(new Date().getTime() / 1000);
                var difference = endTime-nowTime;
                if (difference <= 0) {
                    socket.send('[client] [load] => giveaway');
                    clearInterval(iId);
                    return;
                }

                var minutes = Math.floor(difference/60);
                var seconds = difference-(minutes*60)
                
                timeHolder.innerText = minutes.toString()+"m, "+seconds.toString()+"s";
            },500);
        }

        if (location.hash == "/earn" || location.hash == "#/earn") {
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div:nth-child(1) > div > div > div > h2").innerText = obj.stock;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div.col-12.col-md-4.fade-in-150 > div > div > h2").innerText = obj.offers;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(1) > div > div.col-12.col-md-4.fade-in-200 > div > div > h2").innerText = obj.users;
            document.querySelector("iframe#adgate").src = obj.offerwalls.adgate;
            document.querySelector("iframe#ayet").src = obj.offerwalls.ayet;
            document.querySelector("iframe#adgem").src = obj.offerwalls.adgem;
            document.querySelector("iframe#offertoro").src = obj.offerwalls.offertoro;
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;
            
            var d = Math.random();
            if (d < 0.8){
                // 80% chance of being here
                console.log('80% chance')
            }
            else if (d < 0.90){
                // 15% chance of being here
                if (obj.chest_earn_count < 3 && obj.basic_chest == 0){
                console.log('YOU ARE SO CLOSE TO BASIC CHEST!');
                Swal.fire({
                      html: `
                      <img src="https://rbx.fun/assets/other_chests/common-closed.png" style="width:180px;padding:15px;">
                      <div class="progress" style="background-color: #d8d8d8;margin-left:25%;margin-right:25%;">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: `+ obj.chest_earn_count*(100/3) +`%;"></div></div>
                      <h4 style="margin-top:20px;">You're SO CLOSE to a <span style="color:brown!important;">BASIC Chest!</span></h4>
                      <h6>Complete `+ (3-obj.chest_earn_count) +` more offers!</h6>
                      `,
                      footer: '<a href>YOU CAN GET <span class="text-success">30</span> ROBUX FROM BASIC CHEST!</a>'
                    })
            } else if (obj.chest_earn_count < 5 && obj.rare_chest == 0){
                Swal.fire({
                      html: `
                      <img src="https://rbx.fun/assets/chests/rare-chest.png" style="width:180px;padding:15px;">
                      <div class="progress" style="background-color: #d8d8d8;margin-left:25%;margin-right:25%;">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: `+ obj.chest_earn_count*20 +`%;"></div></div>
                      <h4 style="margin-top:20px;">You're SO CLOSE to a <span style="color:orange!important;">RARE Chest!</span></h4>
                      <h6>Complete `+ (5-obj.chest_earn_count) +` more offers!</h6>
                      `,
                      footer: '<a href>YOU CAN GET <span class="text-success">150</span> ROBUX FROM RARE CHEST!</a>'
                    })
            } else if (obj.chest_earn_count < 10 && obj.godly_chest == 0){
                Swal.fire({
                      html: `
                      <img src="https://rbx.fun/assets/chests/godly-chest.png" style="width:180px;padding:15px;">
                      <div class="progress" style="background-color: #d8d8d8;margin-left:25%;margin-right:25%;">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: `+ obj.chest_earn_count*10 +`%;"></div></div>
                      <h4 style="margin-top:20px;">You're SO CLOSE to a <span style="color:#09b3ac!important;">GODLY Chest!</span></h4>
                      <h6>Complete `+ (10-obj.chest_earn_count) +` more offers!</h6>
                      `,
                      footer: '<a href>YOU CAN GET <span class="text-success">1,000</span> ROBUX FROM BASIC CHEST!</a>'
                    })
            }
            }
            else{
                // 5% chance of being here
                console.log('5% chance')
                                Swal.fire({
                  title: '<strong>Do you have a Youtube or TikTok Account?</strong>',
                  icon: 'info',
                  html:
                    'Make a video on RBX.LAND and get paid <b>500 ROBUX</b> per <b>1,000 views<b>!',
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> I will make a video!',
                  confirmButtonAriaLabel: 'Thumbs up, great!',
                  cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>',
                  cancelButtonAriaLabel: 'Thumbs down'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open('https://robuxs.land/help/sponsor.php', '_blank');
                    }
                        })
            }
            
            var userid = obj.id;
            var opened_starter = obj.opened_starter;
            var minecraft_link = 'https://grptrk.com/show.php?l=0&u=333307&id=32676';
            var roblox_link = 'https://grptrk.com/show.php?l=0&u=333307&id=32342';
            var solitaire_link = 'https://prizelord.com';
            var solitaire_title = 'Enter email and name (1 min)';
            var solitaire_image = 'https://i.insider.com/5dfd3f82855cc23fb207d8ed?width=1100&format=jpeg&auto=webp';

            $.getJSON('https://pro.ip-api.com/json?key=5G6q3L4l6VC8ibh', function(data){
                console.log(data.countryCode);
                if (data.countryCode == "US"){
                    minecraft_link = 'https://grptrk.com/show.php?l=0&u=333307&id=32676';
                    roblox_link = 'https://grptrk.com/show.php?l=0&u=333307&id=32342';
                    solitaire_link = 'https://prizelord.com';
                    solitaire_title = 'Enter Email (10 secs)';
                    solitaire_image = 'https://i.imgur.com/gQ3UI8q.png';
                }else if (data.countryCode == "CA"){
                    solitaire_link = 'http://adgatetraffic.com/cl/350063/63846?s1=';
                    solitaire_title = 'Install app (EASY!!)';
                    solitaire_image = 'https://i.imgur.com/gQ3UI8q.png';
                }
            });
            
            if (opened_starter == "0") {
                var rewards = [2.1, 120, 10, 1.75]; // 1x
            } else {
                var rewards = [4, 120, 16, 3.5]; // 2x
            }
            var offers = [
                    {"todo": "Minecraft Quiz - Get 100%", "reward": rewards[0], "img": "https://cdn.discordapp.com/attachments/716819389130866738/744132879600058378/LvNXk2LvkwfFxhgUk2j5WL.jpg", "link": minecraft_link+userid},
                    {"todo": solitaire_title, "reward": rewards[1], "img": solitaire_image, "link": solitaire_link},
                     {"todo": "Roblox Quiz - Get 100%", "reward": rewards[2], "img": "https://cdn.discordapp.com/attachments/719181714068340776/744194308172808233/dd0f0b82-bfb0-468f-ae11-32cc5e49dea3-min.jpg", "link": roblox_link+userid},
                    {"todo": "Install + Sign up (4 mins)", "reward": rewards[3], "img": "https://cdn.discordapp.com/attachments/719181714068340776/744195961324175370/Starbucks-cup-of-coffee-at-a-table-min.jpg", "link": "http://adgatetraffic.com/cl/349171/63846?s1="+userid}
                ];
                
            
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(2) > div").style.backgroundImage = offers[0].img;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(2) > div > div.my-3.bg-primary.rounded.p-3.shadow-sm.text-center.maincard-three.maincard-three-snap.INd39d > span").innerText = offers[0].todo;
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[2]/div/div[3]/div/div[1]/button/span").innerText = offers[0].reward.toString() + " R$";
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[2]/div/div[3]/div/div[2]/button").onclick = function() {
                openInNewTab(offers[0].link);
            }
            
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(3) > div").style.backgroundImage = "url("+offers[1].img+")";
            console.log(solitaire_image);
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(3) > div > div.my-3.bg-primary.rounded.p-3.shadow-sm.text-center.maincard-three.maincard-three-snap.INd39d > span").innerText = offers[1].todo;
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[3]/div/div[3]/div/div[1]/button/span").innerText = offers[1].reward.toString() + " R$";
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[3]/div/div[3]/div/div[2]/button").onclick = function() {
                openInNewTab(offers[1].link);
            }
            
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(4) > div").style.backgroundImage = offers[2].img;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(4) > div > div.my-3.bg-primary.rounded.p-3.shadow-sm.text-center.maincard-three.maincard-three-snap.INd39d > span").innerText = offers[2].todo;
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[4]/div/div[3]/div/div[1]/button/span").innerText = offers[2].reward.toString() + " R$";
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[4]/div/div[3]/div/div[2]/button").onclick = function() {
                openInNewTab(offers[2].link);
            }
            
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(5) > div").style.backgroundImage = offers[3].img;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row.eid3_3me > div > div:nth-child(5) > div > div.my-3.bg-primary.rounded.p-3.shadow-sm.text-center.maincard-three.maincard-three-snap.INd39d > span").innerText = offers[3].todo;
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[5]/div/div[3]/div/div[1]/button/span").innerText = offers[3].reward.toString() + " R$";
            getElementByXpath("/html/body/main/div[1]/div/div[2]/div/div[5]/div/div[3]/div/div[2]/button").onclick = function() {
                openInNewTab(offers[3].link);
            }
            
        }

        if (location.hash == "/withdraw" || location.hash == "#/withdraw") {
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;
            
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row > div:nth-child(1) > div > div > h2").innerText = obj.stock;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row > div:nth-child(2) > div > div > h2").innerText = obj.offers;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div.row > div:nth-child(3) > div > div > h2").innerText = obj.users;
            document.querySelector("body > main > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(1) > div > h4").innerText = obj.username;
            document.querySelector("body > main > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(1) > div > a.btn.btn-primary.text-white.waves-effect.waves-light > span").innerText = Math.round(obj.balance * 100) / 100;
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(1) > div > img").src = "https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="+obj.username;
            
            document.querySelector("#modalToggle1").onclick = function() {
                document.querySelector("#infoPanel1 > img").src = obj.groupInfo.image;
                document.querySelector("#infoPanel1 > div.row > div > a").href = obj.groupInfo.link;
                $('#robuxModalPart1').modal('toggle');
            }

            document.querySelector("#infoContinue1").onclick = function() {
                $('#robuxModalPart1').modal('toggle');
                document.querySelector("#ads1 > h5 > span.text-success").innerText = Math.round(obj.balance * 100) / 100;
                document.querySelector("#ads1 > h5 > span.text-primary").innerText = obj.username;
                $('#robuxModalPart2').modal('toggle');
            }

            document.querySelector("#adsContinue1").onclick = function() {
                $('#robuxModalPart2').modal('toggle');
                socket.send('withdraw');
            }
            
            document.querySelector("#adsBack").onclick = function() {
                $('#robuxModalPart2').modal('toggle');
                $('#robuxModalPart1').modal('toggle');
            }
            
            document.querySelector("#robuxModalPart2 > div > div > div.modal-body > div > div > h5 > span.text-success").innerText = Math.round(obj.balance * 100) / 100;
            document.querySelector("#robuxModalPart2 > div > div > div.modal-body > div > div > h5 > span.text-primary").innerText = obj.username;
            
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(1) > div > a.btn.btn-primary.text-white.waves-effect.waves-light > span").innerText = Math.round(obj.balance * 100) / 100;
            var example = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(3) > div > div > div.win-table.text-left > div").cloneNode(true);
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(3) > div > div > div.win-table.text-left > div").remove();
            var holder = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(3) > div > div > div.win-table.text-left");
            for (i in obj.recentearnings) {
                if (obj.recentearnings[i] != null) {
                    var hihi = example.cloneNode(true);
                    holder.appendChild(hihi);
                    hihi.querySelector("div.win-table.text-left > div > img").src = "https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="+obj.recentearnings[i]['username'];
                    hihi.querySelector("div.win-table.text-left > div > div > span > span > span").innerText = obj.recentearnings[i].amount;
                    hihi.querySelector("div.win-table.text-left > div > div > h5 > span > span").innerText = obj.recentearnings[i].amount;
                    hihi.querySelector("div.win-table.text-left > div > div > h5 > span:nth-child(1)").innerText = obj.recentearnings[i]['username'];
                }
            }
            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(3) > div > div > div.card.align-self-stretch > h4 > span > span").innerText = Math.round(obj.totalearned).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),2;
        }

        if (location.hash == "/inventory" || location.hash == "#/inventory") {
            console.log(obj);
            
            document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = Math.round(obj.balance * 100) / 100;

            var winnersHolder = document.querySelector("#site-content > div.album.py-5.bg-light > div > div.my-3.p-3.bg-white.rounded.shadow-sm.text-left > div > div:nth-child(2)");
            winnersHolder.childNodes[4].remove();
            winnersHolder.childNodes[4].remove();
            winnersHolder.childNodes[4].remove();
            winnersHolder.childNodes[4].remove();
            console.log(winnersHolder.childNodes);
            var template = winnersHolder.childNodes[2].cloneNode(true);
            winnersHolder.childNodes[3].remove();
            winnersHolder.childNodes[3].remove();
            console.log(winnersHolder.childNodes);
            template = winnersHolder.childNodes[3].cloneNode(true);
            console.log(template);
            winnersHolder.childNodes[3].remove();
            winnersHolder.childNodes[3].remove();

            var num1 = template.cloneNode(true);
            num1.querySelector("div > img").src = "https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="+obj.chests[0]['username'];
            num1.querySelector("div > div > span:nth-child(2)").innerText = obj.chests[0]['win_amount'].toString();
            num1.querySelector("div > div > h5 > span.badge.badge-success > span").innerText = obj.chests[0]['win_amount'].toString();
            num1.querySelector("div > div > span:nth-child(3)").innerText = obj.chests[0]['chest_type'];
            num1.querySelector("div > div > h5 > span:nth-child(1)").innerText = obj.chests[0]['username'];
            winnersHolder.appendChild(num1)

            var num2 = template.cloneNode(true);
            num2.querySelector("div > img").src = "https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="+obj.chests[1]['username'];
            num2.querySelector("div > div > span:nth-child(2)").innerText = obj.chests[1]['win_amount'].toString();
            num2.querySelector("div > div > h5 > span.badge.badge-success > span").innerText = obj.chests[1]['win_amount'].toString();
            num2.querySelector("div > div > span:nth-child(3)").innerText = obj.chests[1]['chest_type'];
            num2.querySelector("div > div > h5 > span:nth-child(1)").innerText = obj.chests[1]['username'];
            winnersHolder.appendChild(num2)

            var num3 = template.cloneNode(true);
            num3.querySelector("div > img").src = "https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="+obj.chests[2]['username'];
            num3.querySelector("div > div > span:nth-child(2)").innerText = obj.chests[2]['win_amount'].toString();
            num3.querySelector("div > div > h5 > span.badge.badge-success > span").innerText = obj.chests[2]['win_amount'].toString();
            num3.querySelector("div > div > span:nth-child(3)").innerText = obj.chests[2]['chest_type'];
            num3.querySelector("div > div > h5 > span:nth-child(1)").innerText = obj.chests[2]['username'];
            winnersHolder.appendChild(num3)

            try {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > h6 > span").innerText = obj.chest_earn_count;
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div.progress > div").style.width = Math.round(obj.chest_earn_count/3*100).toString()+"%";
            } catch (err) {
                var doe = "nothing";
            }

            try {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > h6 > span").innerText = obj.chest_earn_count;
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div.progress > div").style.width = Math.round(obj.chest_earn_count/5*100).toString()+"%";
            } catch (err) {
                var doe = "nothing";
            }

            try {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > h6 > span").innerText = obj.chest_earn_count;
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > div.progress > div").style.width = Math.round(obj.chest_earn_count/10*100).toString()+"%";
            } catch (err) {
                var doe = "nothing";
            }

            if (parseInt(obj.chest_earn_count) >= 3 && obj.basic_chest == "0") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div.progress").remove();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > h6").remove();
                var newbtn = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button").cloneNode();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)").appendChild(newbtn);
                newbtn.innerText = "OPEN!";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div.video-container > img").src = "assets/other_chests/common-closed.png";

                newbtn.onclick = function() {
                    $('#basicChestModal').modal('toggle');
                    basicChestButton = document.querySelector("#basicChestModal > div > div > div.modal-body > section > button");
                    basicChestButton.onclick = function() {
                        basicChestButton.classList.add("clicked");
                        setTimeout(function () {
                            socket.send('BASIC_OPENING');
                            $('#basicChestModal').modal('toggle');
                            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div.col-md-3.chest-card.fade-in-250 > div:nth-child(2) > button").remove();
                        }, 1200);
                    }
                }
            } else if (obj.basic_chest == "1") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div.progress").remove();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > h6").innerText = "OPENED";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div.video-container > img").src = "assets/other_chests/common-open.png";
            }

            if (parseInt(obj.chest_earn_count) >= 5 && obj.rare_chest == "0") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div.progress").remove();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > h6").remove();
                var newbtn = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button").cloneNode();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2)").appendChild(newbtn);
                newbtn.innerText = "OPEN!";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div > img").src = "assets/other_chests/rare-closed.png";

                newbtn.onclick = function() {
                    $('#rareChestModal').modal('toggle');
                    rareChestButton = document.querySelector("#rareChestModal > div > div > div.modal-body > section > button");
                    rareChestButton.onclick = function() {
                        rareChestButton.classList.add("clicked");
                        setTimeout(function () {
                            socket.send('RARE_OPENING');
                            $('#rareChestModal').modal('toggle');
                            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div.col-md-3.chest-card.fade-in-300 > div:nth-child(2) > button").remove();
                        }, 1200);
                    }
                }
            } else if (obj.rare_chest == "1") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div.progress").remove();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > h6").innerText = "OPENED";
                document.querySelector("body > main > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > h6").style.fontSize = "30px";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div > img").src = "assets/other_chests/rare-open.png";
            }

            if (parseInt(obj.chest_earn_count) >= 10 && obj.godly_chest == "0") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > div.progress").remove();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > h6").remove();
                var newbtn = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button").cloneNode();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > div.video-container").appendChild(newbtn);
                newbtn.innerText = "OPEN!";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > div.video-container > img").src = "assets/other_chests/godly-closed.png";

                newbtn.onclick = function() {
                    $('#godlyChestModal').modal('toggle');
                    godlyChestButton = document.querySelector("#godlyChestModal > div > div > div.modal-body > section > button");
                    godlyChestButton.onclick = function() {
                        godlyChestButton.classList.add("clicked");
                        setTimeout(function () {
                            socket.send('GODLY_OPENING');
                            $('#godlyChestModal').modal('toggle');
                            document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div.col-md-3.chest-card.fade-in-350 > div:nth-child(2) > button").remove();
                        }, 1200);
                    }
                }
            } else if (obj.godly_chest == "1") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > div.progress").remove();
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > h6").innerText = "OPENED";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > div.video-container > img").src = "assets/other_chests/godly-closed.png";
            }

            if (obj.opened_starter == "1") {
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button").remove();
                document.querySelector("body > main > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > img").src = "assets/img/open.png";
                var someText = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > h6").cloneNode();
                someText.innerText = "OPENED";
                document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)").appendChild(someText);
            }
        }

    } else if (event.data.startsWith("[SUCCESS] ")) {
        var text = event.data.split("[SUCCESS] ",2)[1];
        Swal.fire(
            'Success!',
            text,
            'success'
        );
        if (text == "Claimed 0.5 daily robux.") {
            socket.send('[client] [load] => withdraw');
        }
    } else if (event.data.startsWith("[FAIL] ")) {
        var text = event.data.split("[FAIL] ",2)[1];
        Swal.fire(
            'Oh no!',
            text,
            'error'
        );
    } else if (event.data.startsWith("[CHEST OPENED] ")) {
        var obj = JSON.parse(event.data.split("[CHEST OPENED] ",2)[1]);
        obj.chance = Math.round(obj.chance*100)/100;
        if (obj.chance >= 30) {
            var footer = '<a style="color:brown;">COMMON ITEM ('+obj.chance.toString()+'% CHANCE)</a>';
        } else if (obj.chance >= 0.6) {
            var footer = '<a style="color:purple;">RARE ITEM ('+obj.chance.toString()+'% CHANCE)</a>';
        } else if (obj.chance >= 0.04) {
            var footer = '<a style="color:purple;">LEGENDARY ITEM ('+obj.chance.toString()+'% CHANCE)</a>';
        }
        socket.send('[client] [load] => inventory');
        Swal.fire({
            imageUrl: 'assets/robux.png',
            imageHeight: 180,
            imageWidth: 150,
            imageAlt: 'A tall image',
            title: 'YOU WON ROBUX',
            text: obj.won.toString()+ ' ROBUX!',
            footer: footer
        });
    } else if (event.data.startsWith("[EARN] ")) {
        var obj = JSON.parse(event.data.split("[EARN] ",2)[1]);
        if (location.hash == "/withdraw" || location.hash == "#/withdraw") {
            var daddy = document.querySelector("#site-content > div.album.py-5.bg-light > div > div:nth-child(2) > div:nth-child(3) > div > div > div.win-table.text-left");
            var dab = daddy.lastChild;
            querySelector("div.win-table.text-left > div > img").src = "https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username="+obj.username;
            dab.querySelector("div.win-table.text-left > div > div > span > span > span").innerText = obj.amount;
            dab.querySelector("div.win-table.text-left > div > div > h5 > span > span").innerText = obj.amount;
            daddy.insertBefore(dab, daddy.firstChild)
        }
    } else if (event.data.startsWith("New giveaway amount of users bla bla = ")) {
        if (location.hash == "/giveaway" || location.hash == "#/giveaway") {
            var entries = parseInt(event.data.split("New giveaway amount of users bla bla = ",2)[1]);
            var chance = (Math.round(1/entries*100*1000)/1000);
            if (!isFinite(chance)) {
                var chance = 0;
            }
            document.querySelector("#site-content > div > div.album.py-5.bg-light.fade-in-100 > div > div > div:nth-child(3) > h3").innerText = chance.toString()+"% Chance"
        }
    } else if (event.data.startsWith("[EVENT_CHEST] ")) {
        var obj = JSON.parse(event.data.split("[EVENT_CHEST] ",2)[1]);
        robuck = obj[0];
        image = obj[1];
        var images = ['/assets/ROBBUBX/1-robux_540x412.jpg', '/assets/ROBBUBX/25-robux_540x412.png','/assets/ROBBUBX/1000-robux_540x412.jpg', '/assets/ROBBUBX/5000-robux_540x412.jpg'];
        generate(divImages);
        setTimeout(function() {
        	$('.raffle-roller-container').css({
        		transition: "all 8s cubic-bezier(.08,.6,0,1)"
        	});
        	console.log(images[image]);
        	$('#CardNumber79').css({
        		"background-image": "url("+images[image]+")"
        	});
        	if (robuck == 5000 || robuck == 1000) {
        	    var opposite = 0;
        	}
        	if (robuck == 1 || robuck == 25) {
        	    var opposite = 3;
        	}
        	console.log(images[opposite]);
        	$('#CardNumber80').css({
        		"background-image": "url("+images[opposite]+")"
        	});
        	setTimeout(function() {
        		$('#CardNumber79').addClass('winning-item');
        		if (robuck <= 25) {
        		    Swal.fire(
                        'UNLUCKY!',
                        'YOU HAVE WON '+robuck.toString()+' ROBUX',
                        'success'
                    );
        		} else {
        		    Swal.fire(
                        'UNLUCKY!',
                        'YOU HAVE WON '+robuck.toString()+' ROBUX',
                        'success'
                    );
        		}
        		var rrr = Number.parseFloat(document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").textContent);
        		document.querySelector("body > header > nav > div.btn-flex-cst > div:nth-child(1) > div > span").innerText = (rrr+robuck).toString();
        		db = true;
        	}, 8500);
        	$('.raffle-roller-container').css('margin-left', '-6770px');
        }, 500);
    }
    console.log('Message from server ', event.data);
    
});
