var x_campo = 0;
var y_campo = 0;
var campos = 0;
var dif = 1;
var qt_bomba = 0;
var casas = [];

function criar_campo(x,y){
    x_campo = x;
    y_campo = y;

    var campo = document.getElementById('campo');

    var campo_width = x*25;
    var campo_height = y*25;

    campo.style.width = parseFloat(campo_width)+"px";
    campo.style.height = parseFloat(campo_height)+"px";

    var j = 1;

    var campos = x*y;
    campos = campos;

    x = 1;
    y = 1;

    while(y <= y_campo){
        casas[y] = [];
        while(x <= x_campo){
            var pixel = document.createElement("div");
            pixel.setAttribute("id",y+"_"+x);
            pixel.setAttribute("class","pixel");
            pixel.setAttribute("onclick","mostrar_casa('"+y+"_"+x+"',"+y+","+x+")");
            campo.appendChild(pixel);

            casas[y][x] = 0;
            j++;

            x++;
        }
        x = 1;
        y++;
    }
}

function colocar_bombas(dif_f,x,y){
    dif = dif_f;

    if(dif == 4){
        criar_campo(x,y);
        qt_bomba = campos/9;
    }else if(dif == 1){
        qt_bomba = 10;
        criar_campo(9,9);
    }else if(dif == 2){
        qt_bomba = 40;
        criar_campo(16,16);
    }else if(dif == 3){
        qt_bomba = 99;
        criar_campo(30,16);
    }

    var x = 1;
    var y = 1;

    var c = 1;
    while(c <= qt_bomba){
        var r_y = Math.floor((Math.random() * y_campo) + 1);
        var r_x = Math.floor((Math.random() * x_campo) + 1);
        var pixel = document.getElementById(r_y+"_"+r_x);

        if(casas[r_y][r_x] == 0){
            casas[r_y][r_x] = 'B';
        }else{
            c--;
        }
        c++;
    }
}

function colocar_numeros(){
    var y = 1;
    var x = 1;
    while(y <= y_campo){
        while(x <= x_campo){
            if(casas[y][x] == "B"){
                
            }else{
                //Diagonal Esquerda Superior
                if((y - 1) < 1){
                    //Não tem esse campo
                }else{
                    if((x - 1) < 1){
                        //Não existe esse campo
                    }else{
                        var diages = casas[y-1][x-1];
                        if(diages == "B"){
                            casas[y][x] = casas[y][x] + 1;
                        }
                    }
                }

                //Meio Superior
                if((y - 1) < 1){
                    //Não tem esse campo
                }else{
                    var meios = casas[y-1][x];
                    if(meios == "B"){
                        casas[y][x] = casas[y][x] + 1;
                    }
                }

                //Diagonal Direita Superior
                if((y - 1) < 1){
                    //Não tem esse campo
                }else{
                    if((x + 1) > x_campo){
                        //Não existe esse campo
                    }else{
                        var diagds = casas[y-1][x+1];
                        if(diagds == "B"){
                            casas[y][x] = casas[y][x] + 1;
                        }
                    }
                }

                //Esquerda Meio
                if((x - 1) < 1){
                    //Não existe esse campo
                }else{
                    var esqm = casas[y][x-1];
                    if(esqm == "B"){
                        casas[y][x] = casas[y][x] + 1;
                    }
                }

                //Direita Meio
                if((x + 1) > x_campo){
                    //Não existe esse campo
                }else{
                    var diagds = casas[y][x+1];
                    if(diagds == "B"){
                        casas[y][x] = casas[y][x] + 1;
                    }
                }

                //Diagonal Esquerda Inferior
                if((y + 1) > y_campo){
                    //Não tem esse campo
                }else{
                    if((x - 1) < 1){
                        //Não existe esse campo
                    }else{
                        var diages = casas[y+1][x-1];
                        if(diages == "B"){
                            casas[y][x] = casas[y][x] + 1;
                        }
                    }
                }

                //Meio Inferior
                if((y + 1) > y_campo){
                    //Não tem esse campo
                }else{
                    var meii = casas[y+1][x];
                    if(meii == "B"){
                        casas[y][x] = casas[y][x] + 1;
                    }
                }

                //Diagonal Direita Inferior
                if((y + 1) > y_campo){
                    //Não tem esse campo
                }else{
                    if((x + 1) > x_campo){
                        //Não existe esse campo
                    }else{
                        var diadi = casas[y+1][x+1];
                        if(diadi == "B"){
                            casas[y][x] = casas[y][x] + 1;
                        }
                    }
                }
            }
            x++;
        }
        x = 1;
        y++;
    }
    y = 1;
    while(y <= y_campo){
        while(x <= x_campo){
            if(casas[y][x] == 0){
                var pixel = document.getElementById(y+"_"+x);
                pixel.grupo = "0";
            }
            x++;
        }
        x = 1;
        y++;
    }
}

function checar_vizinhos(x,y){
    //Meio Superior
    if((y - 1) < 1){
        //Não tem esse campo
    }else{
        var meios = this.casas[y-1][x];
        if(meios == 0){
            contador++;
            casa_perto[contador] = (y-1)+"_"+(x);
        }
    }

    //Esquerda Meio
    if((x - 1) < 1){
        //Não existe esse campo
    }else{
        var esqm = this.casas[y][x-1];
        if(esqm == 0){
            contador++;
            casa_perto[contador] = (y)+"_"+(x-1);
        }
    }

    //Direita Meio
    if((x + 1) > this.x){
        //Não existe esse campo
    }else{
        var diagds = this.casas[y][x+1];
        if(diagds == 0){
            contador++;
            casa_perto[contador] = (y)+"_"+(x+1);
        }
    }

    //Meio Inferior
    if((y + 1) > this.y){
        //Não tem esse campo
    }else{
        var meii = this.casas[y+1][x];
        if(meii == 0){
            contador++;
            casa_perto[contador] = (y+1)+"_"+(x);
        }
    }
}

function mostrar_casa(nome,x,y){
    nome = String(nome);
    var pixel = document.getElementById(nome);
    pixel.innerHTML = this.icone_cor_casas(this.casas[x][y],y+"_"+x);

    if(pixel.value = 0){

    }else{
        if(this.casas[x][y] == 0){
            pixel.value = "0";
        }

        if(this.casas[x][y] == "B"){
            pixel.style = "background-color: #ff0000; border: 4px solid #7f0303;";
            //alert('Fim de jogo!');
            //this.fim();
        }else{
            pixel.style = "background-color: #b4b3b3; border: 4px solid grey;";
            if(this.casas[x][y] == 0){
                //this.casas_perto(y,x);

                var casas_perto = this.casas_perto(y,x);
                if(casas_perto[1] > 0){
                    var str = casas_perto[0]; //str é um array
                    //console.log(str);

                    var c = 1;
                    while(c <= casas_perto[1]){
                        var pixel = str[c];
                        pixel = String(pixel);
                        pixel = pixel.split(',');
                        var nome = pixel[0];

                        var o = nome.split('_');
                        var y_o = o[0];
                        var x_o = o[1];

                        this.mostrar_casa(nome,y_o,x_o);

                        c++;
                    }
                }
            }
        }
    }
}

function icone_cor_casas(valor,vo){
    if(valor == "B"){
        return "<i class='material-icons tiny'>settings</i>";
    }else if(valor == 0){
        return '';
        document.getElementById(vo).value = "0";
    }else if(valor == 1){
        return "<e style='color: #119a9a'>"+valor+"</e>";
    }else if(valor == 2){
        return "<e style='color: blue'>"+valor+"</e>";
    }else if(valor == 3){
        return "<e style='color: green'>"+valor+"</e>";
    }else if(valor == 4){
        return "<e style='color: orange'>"+valor+"</e>";
    }else if(valor == 5){
        return "<e style='color: red'>"+valor+"</e>";
    }else if(valor == 6){
        return "<e style='color: purple'>"+valor+"</e>";
    }else if(valor == 7){
        return "<e style='color: black'>"+valor+"</e>";
    }else if(valor == 8){
        return "<e style='color: brown'>"+valor+"</e>";
    }else{
        return "L";
    }
}