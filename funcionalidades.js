
//  / __|__ _| |__ _ _(_)___| |/ _|/ _|___ _ _ 
// | (_ / _` | '_ \ '_| / -_) |  _|  _/ -_) '_|
//  \___\__,_|_.__/_| |_\___|_|_| |_| \___|_|  
// https://github.com/Gabrielffer

const objTexto       = document.getElementById('texto');
let priAcaoConcluida = false;
let salvarEntradaIni = true;

function Modificador(texto){
    this.texto         = texto;
    this.nvTexto       = '';
    this.arrCaracteres = texto.split('');
    this.arrParagrafos = texto.split('\n');
    this.ttlCaracteres = this.arrCaracteres.length;
    this.ttlParagrafos = this.arrParagrafos.length;
}

Modificador.prototype.adicionarPrefixoSufixo = function(cadaParagrafo, prefixo, sufixo){
    if(cadaParagrafo == true){
        for(let i = 0; i < this.ttlParagrafos; i++){
            if(this.arrParagrafos[i] != ''){
                this.nvTexto += prefixo + this.arrParagrafos[i] + sufixo + '\n';
            }else{
                this.nvTexto += '\n';
            }
        }
    }else{
        for(let i = 0; i < this.ttlParagrafos; i++){
            let linha        = '';
            let arrConjuntos = this.arrParagrafos[i].split(' ');
            for(let i = 0; i < arrConjuntos.length; i++){
                if(arrConjuntos[i] != ''){
                    linha += prefixo + arrConjuntos[i] + sufixo + ' ';
                }else{
                    linha += ' ';
                }
            }
            this.nvTexto += linha + '\n';
        }
    }
    return this.nvTexto.trimRight();
}

Modificador.prototype.adicionarQuebrasDeLinhas = function(qtdQuebras){
	if(qtdQuebras > 0){
		let quebras = '';
		for(let i = 0; i < qtdQuebras; i++){
			quebras += '\n';
		}
		for(let i = 0; i < this.ttlParagrafos; i++){
			const paragrafo = this.arrParagrafos[i];
			if(paragrafo != ''){
				this.nvTexto += paragrafo + quebras;
			}
		}
	}else{
		this.nvTexto = this.texto;
	}
	return this.nvTexto.trimRight();
}

Modificador.prototype.primeiraLetraMaiuscula = function(todasAsLetras){
	const expRegular = /[A-z]/;
    if(todasAsLetras == true){
        for(let i = 0; i < this.ttlParagrafos; i++){
            let linha        = '';
            let arrConjuntos = this.arrParagrafos[i].split(' ');
            for(let i = 0; i < arrConjuntos.length; i++){
				let conjunto = arrConjuntos[i];
				if(expRegular.exec(conjunto) != null){
					let arrPalavra = conjunto.split('');
					if(expRegular.exec(arrPalavra[0]) != null){
						linha += conjunto.replace(arrPalavra[0], arrPalavra[0].toUpperCase()) + ' ';
					}else{
						let caracteres  = '';
						let novaPalavra = arrPalavra[0];
						for(let i = 1; i < arrPalavra.length; i++){
							if(expRegular.exec(arrPalavra[i]) != null){
								caracteres += arrPalavra[i].toUpperCase();
								for(let x = i + 1; x < arrPalavra.length; x++){
									caracteres += arrPalavra[x];
								}
								break;
							}else{
								caracteres += arrPalavra[i];
							}
						}
						novaPalavra += caracteres;
						linha       += novaPalavra + ' ';
					}
				}else{
					linha += conjunto + ' ';
				}
            }
            this.nvTexto += linha + '\n';
        }
    }else{
        for(let i = 0; i < this.ttlParagrafos; i++){
			let priCaractere = this.arrParagrafos[i].substring(0, 1);
			if(expRegular.exec(priCaractere) != null){
				this.nvTexto += this.arrParagrafos[i].replace(priCaractere, priCaractere.toUpperCase()) + '\n';
			}else{
				const arrCaracteres = this.arrParagrafos[i].split('');
				let nvParagrafo     = '';
				let feito           = false;
				for(let i = 0; i < arrCaracteres.length; i++){
					if(expRegular.exec(arrCaracteres[i]) != null && feito == false){
						nvParagrafo += arrCaracteres[i].toUpperCase();
						feito       =  true;
					}else{
						nvParagrafo += arrCaracteres[i];
					}
				}
				this.nvTexto += nvParagrafo + '\n';
			}
        }
    }
    return this.nvTexto.trimRight();
}

Modificador.prototype.converterTamanho = function(tudoParaMaiusculo){
    if(tudoParaMaiusculo == true){
        this.nvTexto = this.texto.toUpperCase();
    }else{
        this.nvTexto = this.texto.toLowerCase();
    }
    return this.nvTexto;
}

Modificador.prototype.removerItens = function(alvo, todos){
	if(todos == true){
		for(let i = 0; i < this.ttlCaracteres; i++){
			if(this.arrCaracteres[i] == alvo){
				this.arrCaracteres[i] = '';
			}
			this.nvTexto += this.arrCaracteres[i];
		}
	}else{
		const indicesRemocao = [];
		for(let i = 0; i < this.ttlCaracteres; i++){
			if(this.arrCaracteres[i] == alvo && this.arrCaracteres[i + 1] == alvo){
				indicesRemocao.push(i + 1);
			}else{
				indicesRemocao.push('');
			}
		}
		for(let i = 0; i < indicesRemocao.length; i++){
			if(indicesRemocao[i] != ''){
				this.arrCaracteres[i] = '';
			}
			this.nvTexto += this.arrCaracteres[i];
		}
	}
	return this.nvTexto;
}

Modificador.prototype.indentarParagrafos = function(qtdEspaco){
    let espacos = '';
    for(let i = 0; i < qtdEspaco; i++){
        espacos += ' ';
    }
    for(let i = 0; i < this.ttlParagrafos; i++){
        const paragrafo  = this.arrParagrafos[i].trimLeft();
		let valorVolatil = '';
		if(paragrafo != ''){
			valorVolatil = espacos;
		}
		this.nvTexto += valorVolatil + paragrafo + '\n';
    }
    return this.nvTexto.trimRight();
}

Modificador.prototype.inverterTexto = function(){
    const textoInvertido = this.arrCaracteres.reverse();
    for(let i = 0; i < this.ttlCaracteres; i++){
        this.nvTexto += this.arrCaracteres[i];
    }
    return this.nvTexto;
}

Modificador.prototype.localizarSubstituir = function(alvoSubstituicao, substituto){
    this.nvTexto = this.texto.split(alvoSubstituicao).join(substituto);
    return this.nvTexto;
}




const MetaDados = {

	ttlCaracteres : function(txt){
		return txt.length;
	},

	ttlPalavras : function(txt){
        let totalPalavras   = 0;
        let dentroDaPalavra = false;
        for(let i = 0; i < txt.length; i++){
            const caractere = txt[i];
            const eLetra = /[a-zA-ZÀ-ú]/.test(caractere);
            if(eLetra && !dentroDaPalavra){
                totalPalavras++;
                dentroDaPalavra = true;
            }else if(!eLetra){
                dentroDaPalavra = false;
            }
        }
		return totalPalavras;
	}

}


const Historico = {

	arrHistorico : [],

	indice : 0,

	priVez : true,

	adicionar : function(txt){
		Historico.arrHistorico.push(txt);
		Historico.indice += 1;
	},

	voltar : function(){
		if(Historico.priVez == true){
			Historico.indice -= 2;
			Historico.priVez = false;
		}else{
			Historico.indice -= 1;
		}
		const valor = Historico.arrHistorico[Historico.indice];
		if(valor == undefined){
			Historico.indice += 1;
			return false;
		}else{
			return valor;
		}
	},

	avancar : function(){
		Historico.indice += 1;
		const valor       = Historico.arrHistorico[Historico.indice];
		if(valor == undefined){
			Historico.indice -= 1;
			return false;
		}else{
			return valor;
		}
	}

}


const Interacao = {

	adTexto : function(txt){
		document.getElementById('texto').value = txt;
	},

    informarSituacao : function(situacao, alerta = false){
        function desativarBotoes(modo){
            const colecaoBotoes = document.getElementsByTagName('button');
            for(let i = 0; i < colecaoBotoes.length; i++){
                colecaoBotoes[i].disabled = modo;
            }
        }
        desativarBotoes(true);
        const impSituacao = document.getElementById('situacao');
        const arrLetras   = situacao.split('');
        let   indice      = 0;
        impSituacao.style.color = 'lime';
        if(alerta == true){
            impSituacao.style.color = '#E53935';
        }
        impSituacao.innerHTML = '';
        const i = setInterval(function(){
            if(indice == arrLetras.length - 1){
                clearInterval(i);
                desativarBotoes(false);
            }
            impSituacao.innerHTML += arrLetras[indice];
            indice++;
        }, 30);
    },

    mostrar : function(obj){
        obj.style.display = 'block';
    },

    esconder : function(obj){
        obj.style.display = 'none';
    },

	exibirMetaDados : function(objMetaDados){
		document.getElementById('total_caracteres').innerHTML = objMetaDados['ttl_caracteres'];
		document.getElementById('total_palavras').innerHTML   = objMetaDados['ttl_palavras'];
    },

    copiar : function(){
        objTexto.select();
        document.execCommand('Copy');
    }

}




document.getElementById('metodos').onchange = function(){
    const elementos = {1 : document.getElementById('div_prefixo_sufixo'),
                       2 : document.getElementById('div_adicao_quebras_de_linha'),
                       3 : document.getElementById('div_1letra_maiuscula'),
                       4 : document.getElementById('div_conversao_tamanho'),
                       5 : document.getElementById('div_remocao_quebras_linha'),
                       6 : document.getElementById('div_remocao_espacos'),
                       7 : document.getElementById('div_indentacao'),
                       9 : document.getElementById('div_substituicao')};
    for(id in elementos){
        if(this.value == id){
            Interacao.mostrar(elementos[id]);
        }else{
            Interacao.esconder(elementos[id]);
        }
    }
}

document.getElementById('bt_copiar').onclick = function(){
    if(objTexto.value != ''){
        Interacao.copiar();
        Interacao.informarSituacao('Texto copiado.');
    }
}

document.getElementById('texto').oninput = function(){
    Interacao.exibirMetaDados({'ttl_caracteres' : MetaDados.ttlCaracteres(objTexto.value),
						       'ttl_palavras'   : MetaDados.ttlPalavras(objTexto.value)});
}

document.getElementById('bt_voltar').onclick = function(){
	const txtSalvo = Historico.voltar();
	if(txtSalvo != false){
		Interacao.adTexto(txtSalvo);
		Interacao.exibirMetaDados({'ttl_caracteres' : MetaDados.ttlCaracteres(txtSalvo),
						           'ttl_palavras'   : MetaDados.ttlPalavras(txtSalvo)});
	}
}

document.getElementById('bt_modificar').onclick = function(){
    const metodo = document.getElementById('metodos').value;
    if(objTexto.value == ''){
        Interacao.informarSituacao('Digite/cole algum texto na área de texto.', true);
    }else if(metodo == 'Selecione um método'){
        Interacao.informarSituacao('Selecione algum método.', true);
    }else{
		if(salvarEntradaIni == true){
			Historico.adicionar(objTexto.value);
			salvarEntradaIni = false;
		}
        let novoTexto  = '';
        let situacao   = '';
        const ponteiro = new Modificador(objTexto.value);
        switch(metodo){
            case '1':
                novoTexto = ponteiro.adicionarPrefixoSufixo(document.getElementById('prefixo_sufixo_cada_paragrafo').checked,
                                                            document.getElementById('prefixo').value,
                                                            document.getElementById('sufixo').value);
                situacao  = 'Modificação concluída.';
            break;
            case '2':
                novoTexto = ponteiro.adicionarQuebrasDeLinhas(document.getElementById('qtd_quebras').value);
                situacao  = 'As quebras de linhas foram adicionadas.';
            break;
            case '3':
                novoTexto = ponteiro.primeiraLetraMaiuscula(document.getElementById('1letra_maiuscula_todas_letras').checked);
                situacao  = 'Conversão da primeira letra concluída.';
            break;
            case '4':
                novoTexto = ponteiro.converterTamanho(document.getElementById('tudo_para_maiusculo').checked);
                situacao  = 'Conversão concluída.';
            break;
            case '5':
                novoTexto = ponteiro.removerItens('\n', document.getElementById('remover_todas_quebras').checked);
                situacao  = 'As quebras de linha foram removidas.';
            break;
            case '6':
                novoTexto = ponteiro.removerItens(' ', document.getElementById('remover_todos_espacos').checked);
                situacao  = 'Os espaços foram removidos.';
            break;
            case '7':
                novoTexto = ponteiro.indentarParagrafos(document.getElementById('qtd_espaco_indentacao').value);
                situacao  = 'Parágrafos indentados.';
            break;
            case '8':
                novoTexto = ponteiro.inverterTexto();
                situacao  = 'Texto modificado.';
            break;
            default:
                novoTexto = ponteiro.localizarSubstituir(document.getElementById('alvo_substituicao').value,
                                                         document.getElementById('substituto').value);
                situacao  = 'Caracteres substituídos.';
            break;
        }
		priAcaoConcluida = true;
		Interacao.adTexto(novoTexto);
		Interacao.exibirMetaDados({'ttl_caracteres' : MetaDados.ttlCaracteres(objTexto.value),
							       'ttl_palavras'   : MetaDados.ttlPalavras(objTexto.value)});
		Historico.adicionar(novoTexto);
        Interacao.informarSituacao(situacao);
    }
}

document.getElementById('bt_avancar').onclick = function(){
	const txtSalvo = Historico.avancar();
	if(txtSalvo != false){
		Interacao.adTexto(txtSalvo);
		Interacao.exibirMetaDados({'ttl_caracteres' : MetaDados.ttlCaracteres(txtSalvo),
						           'ttl_palavras'   : MetaDados.ttlPalavras(txtSalvo)});
	}
}
