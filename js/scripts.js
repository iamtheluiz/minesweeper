var campo_minado = class{
    constructor(){
        
    }
    criar_campo(x,y){
        this.x = x;
        this.y = y;

        var campo = document.getElementById('campo');
    
        var campo_width = x*25;
        var campo_height = y*25;
    
        campo.style.width = parseFloat(campo_width)+"px";
        campo.style.height = parseFloat(campo_height)+"px";
    
        var j = 1;
    
        var campos = x*y;
        this.campos = campos;

        x = 1;
        y = 1;
        this.casas = [];

        while(y <= this.y){
            this.casas[y] = [];
            while(x <= this.x){
                var pixel = document.createElement("div");
                pixel.setAttribute("id",y+"_"+x);
                pixel.setAttribute("class","pixel");
                pixel.setAttribute("onclick","campo_minado.mostrar_casa('"+y+"_"+x+"',"+y+","+x+")");
                pixel.setAttribute("grupo","");
                campo.appendChild(pixel);

                this.casas[y][x] = 0;
                j++;

                x++;
            }
            x = 1;
            y++;
        }
    }
    fim(){
        //window.location = "index.html";
    }
    
    colocar_bombas(dif,x,y){
        this.dif = dif;

        if(dif == 4){
            this.criar_campo(x,y);
            this.qt_bomba = this.campos/8;
        }else if(dif == 1){
            this.qt_bomba = 10;
            this.criar_campo(9,9);
        }else if(dif == 2){
            this.qt_bomba = 40;
            this.criar_campo(16,16);
        }else if(dif == 3){
            this.qt_bomba = 99;
            this.criar_campo(30,16);
        }

        var x = 1;
        var y = 1;

        var c = 1;
        while(c <= this.qt_bomba){
            var r_y = Math.floor((Math.random() * this.y) + 1);
            var r_x = Math.floor((Math.random() * this.x) + 1);
            var pixel = document.getElementById(r_y+"_"+r_x);

            if(this.casas[r_y][r_x] == 0){
                this.casas[r_y][r_x] = 'B';
            }else{
                c--;
            }
            c++;
        }
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
                        this.mostrar_casa(y+"_"+x,y,x);
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
                        this.mostrar_casa(y+"_"+x,y,x);
                    }else{
                        this.mostrar_casa(y+"_"+x,y,x);
                    }
                }else{
                    this.mostrar_casa(y+"_"+x,y,x);
                }
                
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
            alert('Fim de jogo!');
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
    bandeira(id){
        var elem = document.getElementById(id);
        elem.setAttribute('class','pixel flag');
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