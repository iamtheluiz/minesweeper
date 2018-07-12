//Classe contendo todas as funções do campo minado
var campo_minado = class{
    constructor(){
        
    }

    //Método para criar o campo minado
    criar_campo(x,y){
        this.x = x; //Define a largura do campo
        this.y = y; //Define a altura do campo

        var campo = document.getElementById('campo'); 
    
        //Define o tamanho (em pixels) do campo, com base no número de campos/dificuldade escolhidos pelo usuário
        var campo_width = x*25;
        var campo_height = y*25;

        campo.style.width = parseInt(campo_width)+"px";
        campo.style.height = parseInt(campo_height)+"px";
    
        //Define o número total de campos do campo minado
        var campos = x*y;
        this.campos = campos;

        //Define as variaveis que serão utilizadas em um while
        x = 1;
        y = 1;
        this.casas = [];  //Declara o array que receberá o valor de cada casa, guardando quais delas são bombas, vazias, etc.

        //Incia o loop pela linha de campos (do campo minado)
        while(y <= this.y){
            //Adiciona o indice y no array casas, e o define como um novo array 
            this.casas[y] = [];

            //Inicia um novo loop, passando por cada coluna da linha
            while(x <= this.x){

                //Cria um elemento 'div'
                var pixel = document.createElement("div");
                pixel.setAttribute("id",y+"_"+x);    //Define seu id como a linha+'_'+coluna que pertence
                pixel.setAttribute("class","pixel"); //Define sua class como 'pixel' (class que contém o estilo de um quadrado do campo)
                pixel.setAttribute("onclick","campo_minado.mostrar_casa('"+y+"_"+x+"',"+y+","+x+")");  //Define que ao clicada, essa div chamará a função 'mostrar_casa', usando o valor de seu id como parâmetro 
                pixel.setAttribute("grupo","");      //Define o atributo grupo
                campo.appendChild(pixel);            //Adiciona o elemento ao campo minado

                //Define o valor incial do campo como 0
                this.casas[y][x] = 0;

                x++;
            }
            x = 1;
            y++;
        }
    }

    //Método que finaliza o jogo
    fim(){
        alert('Fim de jogo!');

        //Abre todos os campos do campo minado
        this.display_tudo();

        //Verifica se o usuário clicou no campo para resetar
        var o = 0;
        $('#campo').on('click',function(){
            o++;
            if(o == 1){

            }else{
                window.location = "index.html";
            }
        });
    }
    
    //Método que distribui as bombas no campo
    colocar_bombas(dif,x,y){
        //Guarda a dificuldade na classe
        this.dif = dif;

        if(dif == 4){        //Personalizar
            //Cria um campo com os valores dados pelo usuário
            this.criar_campo(x,y);

            //Define quantas bombas terá o campo
            this.qt_bomba = this.campos/8; // Um oitavo dos campos serão bombas
        }else if(dif == 1){  //Fácil 
            this.qt_bomba = 10;     //Quantidade de bombas
            this.criar_campo(9,9);  //Define o campo
        }else if(dif == 2){  //Médio
            this.qt_bomba = 40;     //Quantidade de bombas
            this.criar_campo(16,16);//Define o campo
        }else if(dif == 3){  //Difícil
            this.qt_bomba = 99;     //Quantidade de bombas
            this.criar_campo(30,16);//Define o campo
        }

        //Prepara variaveis para o While
        var x = 1;
        var y = 1;
        var c = 1;  //Representa a quantidade de bombas já colocadas no campo

        while(c <= this.qt_bomba){ //Enquanto a quantidade de bombas colocadas for menos que a quantidade de bombas que precisam existir
            
            //Pega uma posição aleatória
            var r_y = Math.floor((Math.random() * this.y) + 1); 
            var r_x = Math.floor((Math.random() * this.x) + 1);
            var pixel = document.getElementById(r_y+"_"+r_x);

            //Verifica se ela está vazia            
            if(this.casas[r_y][r_x] == 0){

                //Coloca uma bomba
                this.casas[r_y][r_x] = 'B';
                c++;  //Aumenta o contador de bombas colocadas
            }else{
                //Já existe uma bomba nessa casa
            }
        }
        
        //Atualiza o número de bombas exibidos no HTML
        this.atualizar_display();
    }
    atualizar_display(){
        for(var o = 1; o <= 3; o++){
            var disp = document.getElementById('d'+o);
            disp.setAttribute('class','d d0');
        }
        var bombinhas = this.qt_bomba;
        bombinhas = String(bombinhas);
        
        var array = bombinhas.split("");
        console.log(array.length);
        var i = 2;

        while(i >= 0){
            if(array.length == 3){
                var disp = document.getElementById('d'+(i+1));
                disp.setAttribute('class','d d'+array[i]);
            }else if(array.length == 2){
                if(i == 0){

                }else{
                    var disp = document.getElementById('d'+(i+1));
                    console.log('aaaaa'+i+1);
                    disp.setAttribute('class','d d'+array[(i-1)]);
                }
            }else if(array.length == 1){
                if(i == 0 || i == 1){

                }else{
                    var disp = document.getElementById('d'+(i+1));
                    disp.setAttribute('class','d d'+array[(i-2)]);
                }
            }
            i--;
        }

        // while(i <= array.length){
        //     var d = document.getElementById('d'+i);
        //     console.log(d);

        //     d.setAttribute('class','d d'+array[i-1]);

        //     i++;
        // }


        // while(i <= array.length){
        //     var d = document.getElementById('d'+i);
        //     console.log(d);

        //     d.setAttribute('class','d d'+array[i-1]);

        //     i++;
        // }
    }

    colocar_numeros(){
        var y = 1;
        var x = 1;
        while(y <= this.y){
            while(x <= this.x){
                if(this.casas[y][x] == "B"){
                    
                }else{
                    //Diagonal Esquerda Superior
                    if((y - 1) < 1){
                        //Não tem esse campo
                    }else{
                        if((x - 1) < 1){
                            //Não existe esse campo
                        }else{
                            var diages = this.casas[y-1][x-1];
                            if(diages == "B"){
                                this.casas[y][x] = this.casas[y][x] + 1;
                            }
                        }
                    }

                    //Meio Superior
                    if((y - 1) < 1){
                        //Não tem esse campo
                    }else{
                        var meios = this.casas[y-1][x];
                        if(meios == "B"){
                            this.casas[y][x] = this.casas[y][x] + 1;
                        }
                    }

                    //Diagonal Direita Superior
                    if((y - 1) < 1){
                        //Não tem esse campo
                    }else{
                        if((x + 1) > this.x){
                            //Não existe esse campo
                        }else{
                            var diagds = this.casas[y-1][x+1];
                            if(diagds == "B"){
                                this.casas[y][x] = this.casas[y][x] + 1;
                            }
                        }
                    }

                    //Esquerda Meio
                    if((x - 1) < 1){
                        //Não existe esse campo
                    }else{
                        var esqm = this.casas[y][x-1];
                        if(esqm == "B"){
                            this.casas[y][x] = this.casas[y][x] + 1;
                        }
                    }

                    //Direita Meio
                    if((x + 1) > this.x){
                        //Não existe esse campo
                    }else{
                        var diagds = this.casas[y][x+1];
                        if(diagds == "B"){
                            this.casas[y][x] = this.casas[y][x] + 1;
                        }
                    }

                    //Diagonal Esquerda Inferior
                    if((y + 1) > this.y){
                        //Não tem esse campo
                    }else{
                        if((x - 1) < 1){
                            //Não existe esse campo
                        }else{
                            var diages = this.casas[y+1][x-1];
                            if(diages == "B"){
                                this.casas[y][x] = this.casas[y][x] + 1;
                            }
                        }
                    }

                    //Meio Inferior
                    if((y + 1) > this.y){
                        //Não tem esse campo
                    }else{
                        var meii = this.casas[y+1][x];
                        if(meii == "B"){
                            this.casas[y][x] = this.casas[y][x] + 1;
                        }
                    }

                    //Diagonal Direita Inferior
                    if((y + 1) > this.y){
                        //Não tem esse campo
                    }else{
                        if((x + 1) > this.x){
                            //Não existe esse campo
                        }else{
                            var diadi = this.casas[y+1][x+1];
                            if(diadi == "B"){
                                this.casas[y][x] = this.casas[y][x] + 1;
                            }
                        }
                    }
                }
                x++;
            }
            x = 1;
            y++;
        }
    }
    agrupar_vazios(){
        var x = 1;
        var y = 1;
        var g = 1;

        while(y <= this.y){
            while(x <= this.x){
                if(this.casas[y][x] == 0){
                    var pixel = document.getElementById(y+"_"+x);
                    var na = 0;

                    //Meio Superior
                    if((y - 1) < 1){
                        //Não tem esse campo
                        na++;
                    }else{
                        var esqm = document.getElementById((y-1)+"_"+x).getAttribute('grupo');
                        if(esqm != ''){
                            pixel.grupo = esqm;
                            pixel.setAttribute('grupo',esqm);
                            pixel.setAttribute('onclick',pixel.getAttribute('onclick')+"; campo_minado.abrir_grupo('"+esqm+"')");
                        }else{
                            na++;
                        }
                    }

                    //Esquerda Meio
                    if((x - 1) < 1 ){
                        //Não existe esse campo
                        na++;
                    }else{
                        var esqm = document.getElementById(y+"_"+(x-1)).getAttribute('grupo');
                        if(esqm != ''){
                            pixel.grupo = esqm;
                            pixel.setAttribute('grupo',esqm);
                            pixel.setAttribute('onclick',pixel.getAttribute('onclick')+"; campo_minado.abrir_grupo('"+esqm+"')");
                        }else{
                            na++;
                        }
                    }

                    if(na == 2){
                        pixel.setAttribute('grupo',g);
                        pixel.setAttribute('onclick',pixel.getAttribute('onclick')+"; campo_minado.abrir_grupo('"+g+"')");
                        g++;
                    }
                }
                
                x++;
            }
            x = 1;
            y++;
        }
        console.log(g);
    }
    abrir_grupo(g){
        if(this.grupo == ''){
            this.grupo = g;
        }else{
            this.grupo = this.grupo+","+g;
        }
        x = 1;
        y = 1;
        while(y <= this.y){
            while(x <= this.x){
                if(this.casas[y][x] == 0){
                    var pixel = document.getElementById(y+"_"+x);
                    if(pixel.getAttribute('grupo') == g){
                        this.mostrar_casa(pixel.getAttribute('id'),y,x);
                    }else{
                        //Meio Superior
                        if((y - 1) < 1){
                            //Não tem esse campo
                        }else{
                            var p = document.getElementById((y-1)+"_"+x);
                            if(p.getAttribute('grupo') != ''){
                                if(p.getAttribute('grupo') == g){
                                    //this.mostrar_casa((y-1)+"_"+x,(y-1),x);
                                    if(this.validar_grupo(p.getAttribute('grupo')) == false){
                                        this.abrir_grupo(p.getAttribute('grupo'));
                                    }
                                }
                            }
                        }

                        //Esquerda Meio
                        if((x - 1) < 1 || document.getElementById(y+"_"+(x-1)).getAttribute('grupo') == g){
                            //Não existe esse campo
                        }else{
                            var p = document.getElementById(y+"_"+(x-1));
                            if(p.getAttribute('grupo') != ''){
                                if(p.getAttribute('grupo') == g){
                                    //this.mostrar_casa(y+"_"+(x-1),y,(x-1));
                                    if(this.validar_grupo(p.getAttribute('grupo')) == false){
                                        this.abrir_grupo(p.getAttribute('grupo'));
                                    }                                      
                                }
                            }
                        }

                        //Direita Meio
                        if((x + 1) > this.x || document.getElementById(y+"_"+(x+1)).getAttribute('grupo') == g){
                            //Não existe esse campo
                        }else{
                            var p = document.getElementById(y+"_"+(x+1));
                            if(p.getAttribute('grupo') != ''){
                                if(p.getAttribute('grupo') == g){
                                    //this.mostrar_casa(y+"_"+(x+1),y,(x+1));
                                    if(this.validar_grupo(p.getAttribute('grupo')) == false){
                                        this.abrir_grupo(p.getAttribute('grupo'));
                                    }
                                }
                            }
                        }

                        //Meio Inferior
                        if((y + 1) > this.y || document.getElementById((y+1)+"_"+x).getAttribute('grupo') == g){
                            //Não tem esse campo
                        }else{
                            var p = document.getElementById((y+1)+"_"+x);
                            if(p.getAttribute('grupo') != ''){
                                if(p.getAttribute('grupo') == g){
                                    //this.mostrar_casa((y+1)+"_"+x,(y+1),x);
                                    if(this.validar_grupo(p.getAttribute('grupo')) == false){
                                        this.abrir_grupo(p.getAttribute('grupo'));
                                    }
                                }
                            }
                        }
                    }
                }
                
                x++;
            }
            x = 1;
            y++;
        }
    }
    validar_grupo(g){
        var array = this.grupo.split(',');
        var c = parseInt(array.length) - 1;

        var i = 0;
        while(i <= c){
            if(array[i] == g){
                return true;
            }
            i++;
        }
        return false;
    }

    display_numeros(){
        var x = 1;
        var y = 1;

        while(y <= this.y){
            while(x <= this.x){
                if(this.casas[y][x] != "B"){
                    if(this.casas[y][x] != 0){
                        this.mostrar_casa_fim(y+"_"+x,y,x);
                    }else{

                    }
                }
                
                x++;
            }
            x = 1;
            y++;
        }
    }
    display_tudo(){
        var x = 1;
        var y = 1;

        while(y <= this.y){
            while(x <= this.x){
                if(this.casas[y][x] != "B"){
                    if(this.casas[y][x] != 0){
                        this.mostrar_casa_fim(y+"_"+x,y,x);
                    }else{
                        this.mostrar_casa_fim(y+"_"+x,y,x);
                    }
                }else{
                    this.mostrar_casa_fim(y+"_"+x,y,x);
                }
                var pixel = document.getElementById(y+"_"+x);
                pixel.removeAttribute('onclick');
                
                x++;
            }
            x = 1;
            y++;
        }
    }
    mostrar_casa(nome,y,x){
        var pixel = document.getElementById(nome);
        console.log(y,x);
        this.icone_cor_casas(this.casas[y][x],pixel);

        if(this.casas[y][x] == "B"){
            this.fim();
        }else if(this.casas[y][x] == 0){
            //this.casas_perto(y,x);
            
            //Meio Superior
            if((y - 1) < 1){
                //Não tem esse campo
            }else{
                if(this.casas[y-1][x] != 0){
                    this.mostrar_casa((y-1)+"_"+x,(y-1),x);
                }
            }

            //Esquerda Meio
            if((x - 1) < 1){
                //Não existe esse campo
            }else{
                if(this.casas[y][x-1] != 0){
                    this.mostrar_casa(y+"_"+(x-1),y,(x-1));
                }
            }

            //Direita Meio
            if((x + 1) > this.x){
                //Não existe esse campo
            }else{
                if(this.casas[y][x+1] != 0){
                    this.mostrar_casa((y)+"_"+(x+1),y,(x+1));
                }
            }

            //Meio Inferior
            if((y + 1) > this.y){
                //Não tem esse campo
            }else{
                if(this.casas[y+1][x] != 0){
                    this.mostrar_casa((y+1)+"_"+x,(y+1),x);
                }
            }
        }else{
            //this.casas_perto(y,x);
        }
    }
    mostrar_casa_fim(nome,y,x){
        var pixel = document.getElementById(nome);
        this.icone_cor_casas(this.casas[y][x],pixel);
    }
    
    bandeira(id){
        var elem = document.getElementById(id);
        elem.setAttribute('class','pixel flag');

        this.qt_bomba--;
        this.atualizar_display();
    }
    tirar_bandeira(id){
        var elem = document.getElementById(id);
        elem.setAttribute('class','pixel');

        this.qt_bomba++;
        this.atualizar_display();
    }

    
    icone_cor_casas(valor,elem){
        if(valor == "B"){
            elem.setAttribute('class','pixel mine');
        }else if(valor != 'p'){
            elem.setAttribute('class','pixel t'+valor);
        }else{
            return "Erro";
        }
    }
}