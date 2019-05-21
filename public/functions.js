let outer = document.getElementById('outer');
let tipC = document.getElementById('tipsC');
let treeC = document.getElementById('treeC');
let all = document.body.getElementsByTagName("*");
let newBtn = document.getElementById('newBtn');
let allTreeBtn = document.getElementById('allTreeBtn');
let newC = document.getElementById('newsC');
let viewCartBtn = document.getElementById('viewCartBtn');
let outerCartC = document.getElementById('outerCartC');
let cartC = document.getElementById('cartC');
let thankyouC = document.getElementById('thankYouC');
let checkoutC = document.getElementById('checkoutC');
let innerCheckout = document.getElementById('checkOutButton');
let outerCheckout = document.getElementById('outCheckout');
let userName = document.getElementById('username');
let loginpass = document.getElementById('password');
let loginC = document.getElementById('loginC')
let loginBtn = document.getElementById('loginBtn');
let profileBtn = document.getElementById('profilebtn');
let treeSearchBtn = document.getElementById('treeSearchBtn');
let treeInput = document.getElementById('treeSearch');
let innerTreeC = document.getElementById('innerTreeC');
let isLogin = false;
let singleTreeC;

let tipData = {
    tips: {
        topic: ['Tree needs water', 'Tree need sun light', 'Tree takes space to grow'],
        content: ['you need to give tree enough water', 'you should not plant your tree on a undergrand garage', 'You should not plant tree inside your wardrobe']
    }
};

var treeData = {
    trees: {
        name: ['TreeA', 'TreeB', 'TreeC', 'TreeD'],
        desc: ['DescA', 'DescB', 'DescC', 'DescD'],
        price: ['1', '2', '3', '4']
    }
};
var newData = {
    news: {
        date: ['19/5/2019'],
        desc: ['Team is working on this page']
    }
};
var userBuy = [];
var totalPrice = 0;
var tree = '<div class="alert alert-info text-left"><div class="container"  id = "%TREEBOXID%"><img src="%TREEICON%" width="200" height="200">	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;%NAME% now is $%PRICE% 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;<button class="btn btn-lg btn-danger" id = "%BID%">buy</button></div></div>';

var currentID = 0;
var news = '<div class="container"><p>%TIME%</p><li>%NEWS%</li><br></div>';
var tips = '<div class="container"><p>%TOPIC%</p><li>%CONTENT%</li><br></div>';

var cartTree = '<div class="alert alert-info text-left"><div class="container"><img src="%TREEICON%" width="200" height="200">&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;%NAME% :$ $%PRICE% 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;</div></div>';
loginBtn.addEventListener('click', function () {
    isLogin = true;
    displayLogin();
});

treeSearchBtn.addEventListener('click', function () {
    var userInput = treeSearch.value;

    if (userInput != '') {
        var index = treeData.trees['name'].indexOf(userInput);
        if (index != -1) {
            outerClearup();
            outer.appendChild(treeC);
            treeCleanup();

            var price = treeData.trees['price'][index];
            var desc = treeData.trees['desc'][index];
            var html = tree.replace('%NAME%', userInput);

            html = html.replace('%PRICE%', price);
            html = html.replace('%BID%', 'BID' + index);
            html = html.replace('%TREEICON%', (index + 1) + '.jpg');
            html = html.replace('%TREEBOXID%', 'TREEBOX' + index);
            treeC.insertAdjacentHTML("beforeend", html);
            var button = document.getElementById('BID' + index);
            button.addEventListener('click', function (event) {
                buyButtonClick(event);
            });
            var treeBox = document.getElementById('TREEBOX' + index);
            treeBox.addEventListener('click', function (event) {
                treeBoxClick(event);
            });
        } else {
            alert('NO RESULT FOUND');
        }
    } else {
        alert('INPUT TREE NAME TO SEARCH');
    }
});
viewCartBtn.addEventListener('click', function () {
    console.log(userBuy);
    outerClearup();
    outerCartCCleanup();
    totalPrice = 0;
    outer.appendChild(outerCartC);
    for (i = 0; i != userBuy.length; i++) {
        var html = cartTree.replace('%TREEICON%', (parseInt(userBuy[i]) + 1) + '.jpg');
        html = html.replace('%NAME%', treeData.trees['name'][parseInt(userBuy[i])]);
        html = html.replace('$%PRICE%', treeData.trees['price'][parseInt(userBuy[i])]);
        totalPrice += parseInt(treeData.trees['price'][parseInt(userBuy[i])]);
        console.log(totalPrice);
        cartC.insertAdjacentHTML('beforeend', html);
    }
    document.getElementById('totalPrice').textContent = 'Total price is: ' + totalPrice;
});

allTreeBtn.addEventListener('click', function () {
    outerClearup();
    outer.appendChild(treeC);
    treeCleanup();
    addTree();
    document.getElementById('TreeTitle').textContent = 'All Trees';
});
newBtn.addEventListener('click', function () {
    outerClearup();
    outer.appendChild(tipC);
    outer.appendChild(newC);
});
innerCheckout.addEventListener('click', function () {
    if (userBuy.length != 0) {
        outerClearup();
        outer.appendChild(checkoutC);
    } else {
        alert('you have not thing to check out');
    }
});

outerCheckout.addEventListener('click', function () {
    while (userBuy.length) {
        userBuy.pop();
    }
    console.log(userBuy);
    alert('your order has processed , thanks for shoping ');
    outerClearup();
    outer.appendChild(thankyouC);

})


profileBtn.addEventListener('click', function () {
    if (isLogin) {
        displayLogin();
    } else {
        outerClearup();
        outer.appendChild(loginC);
    }
});


function askLogin() {
}
function displayLogin() {
    var html = '<div id = "thankYouC" class="alert alert-info text-left"><h1>Login success</h1><h1>Welcome back %USER% </h1></div>';
    var user = userName.value;
    if (user != '') {


        html = html.replace('%USER%', user);
        outerClearup();
        //  isLogin = true;
        outer.insertAdjacentHTML('beforeend', html);
    } else {
        alert('you need to input user name');
    }
}

function addNews() {
    for (var i = 0; i != newData.news['date'].length; i++) {
        var html = news.replace('%TIME%', newData.news['date'][i]);
        html = html.replace('%NEWS%', newData.news['desc'][i]);
        newsC.insertAdjacentHTML("beforeend", html);
    }
}

function addTips() {
    for (var i = 0; i != tipData.tips['topic'].length; i++) {
        var html = tips.replace('%TOPIC%', tipData.tips['topic'][i]);
        html = html.replace('%CONTENT%', tipData.tips['content'][i]);
        tipC.insertAdjacentHTML("beforeend", html);
    }
}

function addTree() {
    treeC.appendChild(innerTreeC);
    for (var i = 0; i != treeData.trees['name'].length; i++) {
        var html = tree.replace('%NAME%', treeData.trees['name'][i]);
        html = html.replace('%PRICE%', treeData.trees['price'][i]);
        html = html.replace('%BID%', 'BID' + i);
        html = html.replace('%TREEICON%', (i + 1) + '.jpg');
        html = html.replace('%TREEBOXID%', 'TREEBOX' + i);
        treeC.insertAdjacentHTML("beforeend", html);
        var button = document.getElementById('BID' + i);
        button.addEventListener('click', function (event) {
            buyButtonClick(event);
        });
        var treeBox = document.getElementById('TREEBOX' + i);
        treeBox.addEventListener('click', function (event) {
            treeBoxClick(event);
        });
    }
}
function treeCRebuild() {

}

function treeBoxClick(event) {
    console.log(event);
    if (!(event.target.id).includes('BID')) {
        outerClearup();
        var treeTarget;
        if (event.target.id != '') {
            console.log('hit the box');
            treeTarget = (event.target.id).split('TREEBOX')[1];
        } else {
            var targetArray = (event.target.src).split('.jpg')[0].split('/');
            treeTarget = targetArray[targetArray.length - 1] - 1;
        }
        console.log(treeTarget);

        var theTree = '<div class="alert alert-info text-left"  id = "%BTID%"><center><img src="%TREEICON%"><br><h1 style=font-size:100px>%TREENAME%</h1><h1 class="text-success">$%TREEPRICE%</h1><h1>%TREEDESC%</h1><button id = "%BBID%" class="btn btn-danger btn-lg">buy</button></center></div>';

        var singleTreeHtml = theTree.replace('%TREENAME%', treeData.trees['name'][treeTarget]);
        singleTreeHtml = singleTreeHtml.replace('%TREEPRICE%', treeData.trees['price'][treeTarget]);
        singleTreeHtml = singleTreeHtml.replace('%BBID%', 'BBID' + treeTarget);
        singleTreeHtml = singleTreeHtml.replace('%BTID%', 'BTID' + treeTarget)
        singleTreeHtml = singleTreeHtml.replace('%TREEICON%', (parseInt(treeTarget) + 1) + '.jpg');
        singleTreeHtml = singleTreeHtml.replace('%TREEDESC%', treeData.trees['desc'][treeTarget]);
        outer.insertAdjacentHTML("beforeend", singleTreeHtml);
        singleTreeC = document.getElementById('BTID' + treeTarget);
        var singleTreeBuyButton = document.getElementById('BBID' + treeTarget);
        singleTreeBuyButton.addEventListener('click', function (event) {
            singleTreeAddToCart(event);
        });
    }
}
function singleTreeAddToCart(event) {
    var clickedOn = (event.target.id).split('BBID')[1];
    var i = parseInt(clickedOn);
    //prompt('are you going to buy tree:'+);
    userBuy.push(i);
    alert('Tree : ' + treeData.trees['name'][i] + '   Price : ' + treeData.trees['price'][i] + ', now is in your cart!!');
}
function outerClearup() {
    var last = outer.lastChild;

    while (last) {
        outer.removeChild(last);
        last = outer.lastElementChild;
    }
}
function outerCartCCleanup() {
    var last = cartC.lastChild;

    while (last) {
        cartC.removeChild(last);
        last = cartC.lastElementChild;
    }
}
function treeCleanup() {
    var last = treeC.lastChild;

    while (last) {
        treeC.removeChild(last);
        last = treeC.lastElementChild;
    }
}

function buyButtonClick(event) {
    var clickedOn = (event.target.id).split('BID')[1];
    var i = parseInt(clickedOn);
    //prompt('are you going to buy tree:'+);
    userBuy.push(i);
    alert('Tree : ' + treeData.trees['name'][i] + '    Price : ' + treeData.trees['price'][i] + ', now is in your cart!!');
}


function hideLoginC() {
    outer.removeChild(loginC);
}
function hideCartC() {
    outer.removeChild(outerCartC);
}

function hideCheckOutC() {
    outer.removeChild(checkoutC);
    outer.removeChild(thankyouC);
}
function clearup() {
    console.info(outer);
    outer.style.visibility = 'hidden';
    var html = '<div class="container"><img src="lang-logo.png" width="400" height="150">testing<button id = "123">buy</button></div></div>';
    outer.insertAdjacentHTML('beforeend', html);
}
addTips();
hideCartC();
hideCheckOutC();
addTree();
addNews();
hideLoginC();
