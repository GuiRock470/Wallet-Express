var dados = [
    {
        id: 0,
        nome: "Bernardo",
        email: "exemplo@mail.com",
        senha: "456TyJK980",
        tel: "+55 97 99235-3274",
        address: "Rua Nome Qualquer, 00, Centro, Rio de Janeiro-RJ",
        cpf: "136.865.345-89",
        discord: "bernardo#0000",
        binance: "truck:456644336789",
        img: "C:\\fakepath\\icon128.png"
    },
    {
        id: 1,
        nome: "Leonardo",
        email: "exemplo@mail.com",
        senha: "456TyJK980",
        tel: "+55 83 99477-2486",
        address: "Rua Nome Qualquer, 00, Centro, Rio de Janeiro-RJ",
        cpf: "136.865.345-88",
        discord: "leo#0000",
        binance: "strff:456644336789",
        img: "C:\\fakepath\\icon128.png"
    },
    {
        id: 2,
        nome: "Gustavo",
        email: "exemplo@mail.com",
        senha: "456TyJK980",
        tel: "+55 68 99813-9885",
        address: "Rua Nome Qualquer, 00, Centro, Rio de Janeiro-RJ",
        cpf: "136.865.345-88",
        discord: "guto#0000",
        binance: "trrii:456644336789",
        img: "C:\\fakepath\\icon128.png"
    }
],
showCurrentTab = function(tabKey){
    if(window.location.href.indexOf("index.html") < 0){
        if(tabKey !== undefined){
            $(".content").each(function (i) {
                if($(this).attr("tab-key") == tabKey){
                    $(this).addClass("active");
                }
                else{
                    $(this).removeClass("active");
                }
            });
        }
        else{
            if(tabKey !== undefined){
                $(".box-body").addClass("hide");
                $("." + tabKey + "-box-body").removeClass("hide");
                $(".footer-div").removeClass("show");
                $("#" + tabKey + "-fd").addClass("show");
            }
            else{
                if(window.location.href.indexOf("#") < 0){
                    showCurrentTab("dashboard");
                    document.location.hash = "dashboard";
                }
                else{
                    tabKey = document.location.hash.replace("#", "");
                    $(".menu-item").removeClass("selected");
                    $(".content").each(function () {
                        if($(this).attr("tab-key") == tabKey){
                            $(".menu-item[name='" + tabKey + "']").addClass("selected");
                            $(this).addClass("active");
                        }
                        else{
                            $(this).removeClass("active");
                        }
                    });
                }
                
            }
            
        }
    }
    else{
        if(tabKey !== undefined){
            $(".box-body").addClass("hide");
            $("." + tabKey + "-box-body").removeClass("hide");
            $(".footer-div").removeClass("show");
            $("#" + tabKey + "-fd").addClass("show");
        }
        else{
            if(window.location.href.indexOf("#") < 0){
                showCurrentTab("login");
            }
            else{
                tabKey = document.location.hash.replace("#", "");
                $(".box-body").addClass("hide");
                $("." + tabKey + "-box-body").removeClass("hide");
                $(".footer-div").removeClass("show");
                $("#" + tabKey + "-fd").addClass("show");
            }
            
        }
    }
},
isEmail = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
},
isPassword = function(password) {
    if (password.length < 8)
        return false;
    else
        return true;
},
Login = function() {
    if ($('#login-email-input').val() == '' || $('#login-password-input').val() == '') {
        alert('Erro: Email ou Senha em branco!');
    }
    else {
        var resultSenha = isPassword($('#login-password-input').val());
        var resultEmail = isEmail($('#login-email-input').val());
        if (resultEmail != true) {
            alert("Erro: Email Inválido!");
            $('#login-email-input').val('');
            $('#login-password-input').val('');
        }
        else if (resultSenha != true) {
            alert("Erro: Senha Inválida!");
            $('#login-password-input').val('');
        }
        else {
            window.location ='home.html#dashboard';
        }
    }
},
mudaAba = function(){
    $(".menu-item").removeClass("selected");
    $(this).addClass("selected");

    var tabKey = $(this).attr("name");
    document.location.hash = tabKey;
    showCurrentTab(tabKey);
},
changeInputType = function(){
    var input = $(this).siblings("input");
    if($(this).hasClass("showPass")){
        input.attr("type", "text");
        $(this).attr("src", "src/img/showPassord.svg");
        $(this).removeClass("showPass");
        $(this).addClass("hidePass");
        $(this).unbind();
        $(".password-input").siblings("img.hidePass").on("click", changeInputType);
    }
    else{
        input.attr("type", "password");
        $(this).attr("src", "src/img/hidePassword.svg");
        $(this).removeClass("hidePass");
        $(this).addClass("showPass");
        $(this).unbind();
        $(".password-input").siblings("img.showPass").on("click", changeInputType);
    }
},
showRegisterForm = function(){
    $(this).closest(".tableBox").css("display", "none");
    $(".registerUser-box").css("display", "block");
},
voltaBtn = function(){
    $(this).closest(".registerUser-box").hide();
    $(this).closest(".content").find(".tableBox").show();
},
editTableItem = function(){
    var data = getDados(Number($(this).closest('tr').attr("itemid")));
    $(this).closest(".tableBox").css("display", "none");
    $(".registerUser-box").css("display", "block");

    $("#register-userName-input").val(data.nome);
    $("#register-userEmail-input").val(data.email);
    $("#register-userAddress-input").val(data.address);
    $("#register-userPhone-input").val(data.tel);
    $("#register-userBinance-input").val(data.binance);
    $("#register-userPassw-input").val(data.senha);
    $("#register-userCPF-input").val(data.cpf);
    $("#register-userDiscord-input").val(data.discord);
    processFile();

    $("#ConfirmRegisterUser span").html("Salvar Alterações");
    $("#ConfirmRegisterUser").addClass("edit-btn");
    $("#ConfirmRegisterUser").attr("itemId" ,$(this).closest('tr').attr("itemid"));
},
getDados = function(id){
    //Request dos dados...

    return dados[id];
},
inputFile = function(){
    $("#uploadPictures-Inputfile").click();
},
processFile = function(img){
    $("#register-userFile-input").css("background", "#8C54FF 0% 0% no-repeat padding-box");
    $("#register-userFile-input").css("border", "1px solid #8C54FF");
    $("#register-userFile-input").css("color", "#FFFFFF");
    $("#register-userFile-input").css("cursor", "pointer");
    $("#register-userFile-input").val("Substituir arquivo carregado");
    $("#register-userFile-input").on("click", inputFile);
},
showDeletePopup = function(){
    $(this).addClass("clicked");
    $(".windowOverlay").addClass("fadeIn");
    $("#confirmDelete-popup").addClass("fadeIn");
},
cancelOperation = function(){
    $(this).closest(".popup").addClass(".fadeout");
    $(".windowOverlay").addClass(".fadeout");
    $(this).closest(".popup").removeClass("fadeIn");
    $(".windowOverlay").removeClass("fadeIn");
    $(".delete").removeClass("clicked");
},
deleteClickedItem = function(){
    $(".delete.clicked").closest("tr").remove();
    $(this).closest(".popup").removeClass("fadeIn");
    $("#operationSuccess-popup").addClass("fadeIn");
},
addUser = function(){
    var userNome = $("#register-userName-input").val(),
    userEmail = $("#register-userEmail-input").val(),
    userTel = $("#register-userPhone-input").val(),
    userSenha = $("#register-userPassw-input").val(),
    id;

    if($(this).hasClass("edit-btn")){
        id = $(this).attr("itemId");
        $(".tableBox tr[itemid='" + id + "'] .nameTableCell span").html(userNome);
        $(".tableBox tr[itemid='" + id + "'] .emailTableCell span").html(userEmail);
        $(".tableBox tr[itemid='" + id + "'] .passwordTableCell span").html(userSenha);
        $(".tableBox tr[itemid='" + id + "'] .phoneTableCell span").html(userTel);

        $("#ConfirmRegisterUser span").html("Cadastrar usuário");
        $(this).removeClass("edit-btn");
        $(this).attr("itemId","");
    }
    else{
        for(var i = 0; i < $(".tableBox tr").length; i ++){
            if(i = $(".tableBox tr").length - 1){
                id = $(".tableBox tr").eq(i).attr("itemid");
            }
        }

        $("#usersTableBody").append(`
            <tr itemid="${id}">
                <td class="nameTableCell">
                    <span>${userNome}</span>
                </td>
                <td class="emailTableCell">
                    <span>${userEmail}</span>
                </td>
                <td class="passwordTableCell">
                    <span>**********</span>
                </td>
                <td class="phoneTableCell">
                    <span>${userTel}</span>
                </td>
                <td class="buttonsTableCell">
                    <div class="edit">
                        <img src="src/img/edit.svg" alt="">
                    </div>
                    <div class="delete">
                        <img src="src/img/delete.svg" alt="">
                    </div>
                </td>
            </tr>
        `);
    }

    $(".delete").on("click", showDeletePopup);
    $(".edit").on("click", editTableItem);

    $(".tableBox").css("display", "block");
        $(".registerUser-box").css("display", "none");
}

$(document).ready(function(){
    showCurrentTab();
    $("#forgotPassword-link").on("click", function(){
        showCurrentTab("forgotPass");
    });
    $("#backToLogin-link").on("click", function(){
        showCurrentTab("login");
    });
    $("#cancelRedefPassword").on("click", function(){
        showCurrentTab("login");
    });

    $(".gradientLabel").on("click", function(){
        $("body").toggleClass("player");
    });
    $("#ConfirmRegisterUser").on("click", addUser);
    $(".confirm-btn").on("click", deleteClickedItem);
    $(".cancel-btn").on("click", cancelOperation);
    $(".delete").on("click", showDeletePopup);
    $(".edit").on("click", editTableItem);
    $(".menu-item").on("click", mudaAba);
    $("#loginButton").on("click", Login);
    $(".password-input").siblings("img").on("click", changeInputType);
    $(".backTo-btn").on("click", voltaBtn);
    $(".input-icon-left img").on("click", inputFile);
    $("#uploadPictures-Inputfile").on("change", processFile);

    $("#forgotPassButton").on("click", function(){
        if($("#forgot-email-input").val() !== ''){
            $(".forgotPass-box-body .feedback").addClass("show");
            setTimeout(() => {
                $(".forgotPass-box-body .feedback").removeClass("show");
            }, 10000);
        }
        else{
            alert("Email não preenchido!");
        }
    });

    $("#registerUser").on("click", showRegisterForm)

    $(".checkbox-container").on("click", function(){
        $(this).toggleClass("checked");
    });


});