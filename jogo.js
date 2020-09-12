var jogadas = 1;
var matriz_jogo = Array(3);
matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){
  $("#btn_iniciar_jogo").on("click", function(){
    if($("#entrada_apelido_jogador_1").val() == "" || $("#entrada_apelido_jogador_2").val() == ""){
      alert("Preencha os campos 'Apelido'");
      return false
    }

    $("#nome_jogador_1").html($("#entrada_apelido_jogador_1").val());
    $("#nome_jogador_2").html($("#entrada_apelido_jogador_2").val());

    $("#pagina_inicial").hide();
    $("#tabuleiro").show();
  });

  $(".jogada").on("click", function(){
    var id_campo_click = this.id;
    $("#"+id_campo_click).off();
    clique(id_campo_click);
  });

  function clique(id){
    var icone = "";
    var ponto = 0;
    if ((jogadas % 2) == 1){
      icone = "url('imagens/imagemX.png')";
      ponto = -1;
    }
    else{
      icone = "url('imagens/imagemO.png')";
      ponto = 1;
    }
    jogadas++;
    $("#"+id).css('background-image', icone);
    var linha_coluna = id.split('-');
    matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto

    verificar_combinacao();
  }

  var naoTemVencedor = true;

  function verificar_combinacao(){
    var pontos = 0;

    for(var i = 1; i<=3; i++){
      pontos = pontos + matriz_jogo['a'][i];
    }
    ganhador(pontos);

    pontos = 0;

    for(var i = 1; i<=3; i++){
      pontos = pontos + matriz_jogo['b'][i];
    }
    ganhador(pontos);

    pontos = 0;

    for(var i = 1; i<=3; i++){
      pontos = pontos + matriz_jogo['c'][i];
    }
    ganhador(pontos);

    //vertical
    for(var j = 1; j<=3; j++){
      pontos=0;
      pontos+=matriz_jogo['a'][j];
      pontos+=matriz_jogo['b'][j];
      pontos+=matriz_jogo['c'][j];
      ganhador(pontos);
    }

    //diagonal
    pontos=0;
    pontos=matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
    ganhador(pontos);

    pontos=0;
    pontos=matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
    ganhador(pontos);

    //empate
    if(jogadas==10 && naoTemVencedor){
      alert("Empate");
      $(".jogada").off();
    }
  }

  function ganhador(pontos){
    if(pontos == -3){
      var jogador_1 = $("#entrada_apelido_jogador_1").val();
      alert(jogador_1+" ganhou!");
      naoTemVencedor = false;
      $(".jogada").off();
    }
    if(pontos == 3){
      var jogador_2 = $("#entrada_apelido_jogador_2").val();
      alert(jogador_2+" ganhou!");
      naoTemVencedor = false;
      $(".jogada").off();
    }
  }

});

function start(){
  window.location.reload();
}