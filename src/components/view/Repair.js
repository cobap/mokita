import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Header from './../header/Header';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';

import fire from './../../fire';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom: 10
    },
    detalhes: {
        marginTop: 10,
        marginBottom: 20,
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center',
        color: 'white'
    },
    headline: {
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        color: 'white',
        flex: 'auto',
        fontSize: 18,
        width: 140,
        textAlign: 'center',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 7,
    },
    textField: {
        marginLeft: 30,
        marginRight: 30,
        width: 320,
    },
    botaoplus: {
        textAlign: 'center',
        marginLeft: '37%',
        // margimRight: '50%',
    },
    botaoexclusao: {
    }
});

const subcategoria_parada = [
  { value: 'Ambulancia', label: 'Ambulancia', categoria: 1 },
  { value: 'Problema Guindaste Auxiliar', label: 'Problema Guindaste Auxiliar', categoria: 1 },
  { value: 'Problema Guindaste Principal', label: 'Problema Guindaste Principal', categoria: 1 },
  { value: 'Munck', label: 'Munck', categoria: 1 },
  { value: 'Torre iluminação', label: 'Torre iluminação', categoria: 1 },
  { value: 'Teste compactação do solo', label: 'Teste compactação do solo', categoria: 1 },
  { value: 'Gerador auxiliar', label: 'Gerador auxiliar', categoria: 1 },
  { value: 'Compressor auxiliar', label: 'Compressor auxiliar', categoria: 1 },
  { value: 'Documentação de EHS', label: 'Documentação de EHS', categoria: 1 },
  { value: 'Acidentes incidentes', label: 'Acidentes incidentes', categoria: 1 },
  { value: 'Solicitação cliente', label: 'Solicitação cliente', categoria: 2 },
  { value: 'Condições climaticas', label: 'Condições climaticas', categoria: 2 },
  { value: 'Questões técnicas', label: 'Questões técnicas', categoria: 2 },
];

const tipo_parada = [
  { value: 'Guindaste', label: 'Guindaste', categoria: 1 },
  { value: 'Outros', label: 'Outros', categoria: 2 },
];

const tiporepair = [
  { value: 'Inspecao', label: 'Inspeção', categoria: 0 },
  { value: 'MCE', label: 'MCE', categoria: 1 },
  { value: 'UpTowerRepair', label: 'Up Tower Repair', categoria: 2 },
  { value: 'DownTowerRepair', label: 'Down Tower Repair', categoria: 3 },
];

const subcategoria = [
  // Buroscopia
  { value: 'Boroscopia Completa', label: 'Boroscopia Completa', categoria: 0, subcategoria: 1},
  { value: 'Boroscopia Planetaria', label: 'Boroscopia Planetaria', categoria: 0, subcategoria: 1},
  { value: 'Boroscopia Estagio Paralelo', label: 'Boroscopia Estagio Paralelo', categoria: 0, subcategoria: 1},
  { value: 'Boroscopia Mainbearing', label: 'Boroscopia Mainbearing', categoria: 0, subcategoria: 1},
  { value: 'Boroscopia Gerador', label: 'Boroscopia Gerador', categoria: 0, subcategoria: 1},
  { value: 'Inspeção por Drone', label: 'Inspeção por Drone', categoria: 0, subcategoria: 1},

  // MCE
  { value: 'Pitch bearing - Up Tower', label: 'Pitch bearing - Up Tower', categoria: 1, subcategoria: 2},
  { value: 'Pitch bearing - Down Tower', label: 'Pitch bearing - Down Tower', categoria: 1, subcategoria: 3},
  { value: 'Gearbox - Liftra', label: 'Gearbox - Liftra', categoria: 1, subcategoria: 4},
  { value: 'Gearbox - Descida Rotor', label: 'Gearbox - Descida Rotor', categoria: 1, subcategoria: 5},
  { value: 'Gerador', label: 'Gerador', categoria: 1, subcategoria: 6},
  { value: 'Pá', label: 'Pá', categoria: 1, subcategoria: 7},
  { value: 'Transformador', label: 'Transformador', categoria: 1, subcategoria: 8},
  { value: 'Block 2', label: 'Block 2', categoria: 1, subcategoria: 9},
  { value: 'Main Shaft', label: 'Main Shaft', categoria: 1, subcategoria: 10},
  { value: 'Gearbox + Main Shaft', label: 'Gearbox + Main Shaft', categoria: 1, subcategoria: 11},
  { value: 'Nacelle', label: 'Nacelle', categoria: 1, subcategoria: 12},
  { value: 'Carenagem da Nacelle UpTower', label: 'Carenagem da Nacelle', categoria: 1, subcategoria: 13},
  { value: 'Carenagem da Nacelle DownTower', label: 'Carenagem da Nacelle', categoria: 1, subcategoria: 14},

  // UpTowerRepair
  { value: 'Troca do HSS', label: 'Troca do HSS', categoria: 2, subcategoria: 15},
  { value: 'Troca do IMS', label: 'Troca do IMS', categoria: 2, subcategoria: 16},
  { value: 'Troca do LSS', label: 'Troca do LSS', categoria: 2, subcategoria: 17},
  { value: 'Troca dos Rolamentos HSS', label: 'Troca dos Rolamentos HSS', categoria: 2, subcategoria: 18},
  { value: 'Troca dos Rolamentos IMS', label: 'Troca dos Rolamentos IMS', categoria: 2, subcategoria: 19},
  { value: 'Troca dos Rolamentos LSS', label: 'Troca dos Rolamentos LSS', categoria: 2, subcategoria: 20},
  { value: 'Troca de Rolamento Gerador DE', label: 'Troca de Rolamento Gerador DE', categoria: 2, subcategoria: 21},
  { value: 'Troca de Rolamento Gerador NDE', label: 'Troca de Rolamento Gerador NDE', categoria: 2, subcategoria: 22},
  { value: 'Troca de Rolamentos Gerador DE + NDE', label: 'Troca de Rolamentos Gerador DE + NDE', categoria: 2, subcategoria: 23},
  { value: 'Troca dos redutores do Yaw', label: 'Troca dos redutores do Yaw', categoria: 2, subcategoria: 24},
  { value: 'Re-Lead do Gerador', label: 'Re-Lead do Gerador', categoria: 2, subcategoria: 25},
  { value: 'Troca de componentes do freio secundário', label: 'Troca de componentes do freio secundário', categoria: 2, subcategoria: 26},
  { value: 'Troca do slip do gerador', label: 'Troca do slip do gerador', categoria: 2, subcategoria: 27},
  { value: 'Troca de Bus Bar', label: 'Troca de Bus Bar', categoria: 2, subcategoria: 28},

  // DownTowerRepair
  { value: 'Troca do HSS', label: 'Troca do HSS', categoria: 3, subcategoria: 29},
  { value: 'Troca do IMS', label: 'Troca do IMS', categoria: 3, subcategoria: 30},
  { value: 'Troca do LSS', label: 'Troca do LSS', categoria: 3, subcategoria: 31},
  { value: 'Troca dos Rolamentos HSS', label: 'Troca dos Rolamentos HSS', categoria: 3, subcategoria: 32},
  { value: 'Troca dos Rolamentos IMS', label: 'Troca dos Rolamentos IMS', categoria: 3, subcategoria: 33},
  { value: 'Troca dos Rolamentos LSS', label: 'Troca dos Rolamentos LSS', categoria: 3, subcategoria: 34},
  { value: 'Troca de Rolamento Gerador DE', label: 'Troca de Rolamento Gerador DE', categoria: 3, subcategoria: 35},
  { value: 'Troca de Rolamento Gerador NDE', label: 'Troca de Rolamento Gerador NDE', categoria: 3, subcategoria: 36},
  { value: 'Troca de Rolamentos Gerador DE + NDE', label: 'Troca de Rolamentos Gerador DE + NDE', categoria: 3, subcategoria: 37},
  { value: 'Re-Lead do Gerador', label: 'Re-Lead do Gerador', categoria: 3, subcategoria: 38},
  { value: 'Troca do rolamento do Main Shaft', label: 'Troca do rolamento do Main Shaft', categoria: 3, subcategoria: 39},
  { value: 'Reparo do B2', label: 'Reparo do B2', categoria: 3, subcategoria: 40},

];

const atividades = [

  // Basicos
  { value: 'Kick off Meeting', label: 'Kick off Meeting', categoria: 0},
  { value: 'DDS', label: 'DDS', categoria: 0},
  { value: 'Transit Time', label: 'Transit Time', categoria: 0},
  { value: 'Pré Work', label: 'Pré Work', categoria: 0},
  { value: 'Preparação do Ferramental', label: 'Preparação do Ferramental', categoria: 0},
  { value: 'Execução da Atividade', label: 'Execução da Atividade', categoria: 0},
  { value: 'Pós Work', label: 'Pós Work', categoria: 0},
  { value: 'Recolhimento do Material', label: 'Recolhimento do Material', categoria: 0},
  { value: 'Recolhimento do Ferramental', label: 'Recolhimento do Ferramental', categoria: 0},
  { value: 'Relatório fotográfico', label: 'Relatório fotográfico', categoria: 0},
  { value: 'Interrupção por Solicitação do Cliente', label: 'Interrupção por Solicitação do Cliente', categoria: 0},
  { value: 'Interrupção por condições Climáticas', label: 'Interrupção por condições Climáticas', categoria: 0},
  { value: 'Interrupção por condições Técnicas', label: 'Interrupção por condições Técnicas', categoria: 0},

  // Buroscopia
  { value: 'Inspeção do planetario', label: 'Inspeção do planetario', categoria: 1},
  { value: 'Inspeção dos rolamentos dos planetários', label: 'Inspeção dos rolamentos dos planetários', categoria: 1},
  { value: 'Inspeção do wing gear', label: 'Inspeção do wing gear', categoria: 1},
  { value: 'Inspeção do planet carier', label: 'Inspeção do planet carier', categoria: 1},
  { value: 'Inspeção do eixo lento', label: 'Inspeção do eixo lento', categoria: 1},
  { value: 'Inspeção do eixo intermediário', label: 'Inspeção do eixo intermediário', categoria: 1},
  { value: 'Inspeção do eixo rapido', label: 'Inspeção do eixo rapido', categoria: 1},
  { value: 'Inspeção dos rolamentos do eixo rápido', label: 'Inspeção dos rolamentos do eixo rápido', categoria: 1},
  { value: 'Inspeção dos rolamentos do eixo intermediário', label: 'Inspeção dos rolamentos do eixo intermediário', categoria: 1},
  { value: 'Inspeção dos rolamentos do eixo lento', label: 'Inspeção dos rolamentos do eixo lento', categoria: 1},
  { value: 'Inspeção do sun gear', label: 'Inspeção do sun gear', categoria: 1},

  // Pitch bearing - Up Tower
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 2},
  { value: 'Preparação para descida da Pá', label: 'Preparação para descida da Pá', categoria: 2},
  { value: 'Pega da pá', label: 'Pega da pá', categoria: 2},
  { value: 'Descida da pá', label: 'Descida da pá', categoria: 2},
  { value: 'Descida do Extender', label: 'Descida do Extender', categoria: 2},
  { value: 'Retirada de Rolamento', label: 'Retirada de Rolamento', categoria: 2},
  { value: 'Substituição dos studs', label: 'Substituição dos studs', categoria: 2},
  { value: 'Instalação do rolamento', label: 'Instalação do rolamento', categoria: 2},
  { value: 'Subida da pá', label: 'Subida da pá', categoria: 2},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 2},

  // Pitch Bearing - Down Tower
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 3},
  { value: 'Pega das pás de 10 e 2 horas', label: 'Pega das pás de 10 e 2 horas', categoria: 3},
  { value: 'Pega da pá de 6 horas', label: 'Pega da pá de 6 horas', categoria: 3},
  { value: 'Descida do rotor', label: 'Descida do rotor', categoria: 3},
  { value: 'Retirada da pá', label: 'Retirada da pá', categoria: 3},
  { value: 'Retirada de Rolamento', label: 'Retirada de Rolamento', categoria: 3},
  { value: 'Substituição dos studs', label: 'Substituição dos studs', categoria: 3},
  { value: 'Instalação do rolamento', label: 'Instalação do rolamento', categoria: 3},
  { value: 'Instalação da pá', label: 'Instalação da pá', categoria: 3},
  { value: 'Subida do rotor', label: 'Subida do rotor', categoria: 3},
  { value: 'Retirada do pega da pá de 6 horas', label: 'Retirada do pega da pá de 6 horas', categoria: 3},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 3},

  // Gearbox Liftra
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 4},
  { value: 'Remoção do Cooler da Gearbox', label: 'Remoção do Cooler da Gearbox', categoria: 4},
  { value: 'Quebra de torque do Shrinck Disc', label: 'Quebra de torque do Shrinck Disc', categoria: 4},
  { value: 'Montagem do Liftra', label: 'Montagem do Liftra', categoria: 4},
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 4},
  { value: 'Remoção da Gearbox', label: 'Remoção da Gearbox', categoria: 4},
  { value: 'Descida da Gearbox', label: 'Descida da Gearbox', categoria: 4},
  { value: 'Subida da Gearbox', label: 'Subida da Gearbox', categoria: 4},
  { value: 'Instalação da Gearbox', label: 'Instalação da Gearbox', categoria: 4},
  { value: 'Remoção do Liftra', label: 'Remoção do Liftra', categoria: 4},
  { value: 'Instalação do disco de freio', label: 'Instalação do disco de freio', categoria: 4},
  { value: 'Torque do Shrinck Disc', label: 'Torque do Shrinck Disc', categoria: 4},
  { value: 'Instalação do cooler da Gearbox', label: 'Instalação do cooler da Gearbox', categoria: 4},
  { value: 'Instalação do teto da Nacelle', label: 'Instalação do teto da Nacelle', categoria: 4},

  // Gearbox - Descida Rotor
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 5},
  { value: 'Pega das pás de 10 e 2 horas', label: 'Pega das pás de 10 e 2 horas', categoria: 5},
  { value: 'Pega da pá de 6 horas', label: 'Pega da pá de 6 horas', categoria: 5},
  { value: 'Descida do rotor', label: 'Descida do rotor', categoria: 5},
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 5},
  { value: 'Retirada da Gearbox', label: 'Retirada da Gearbox', categoria: 5},
  { value: 'Quebra de torque do Shrinck Disc', label: 'Quebra de torque do Shrinck Disc', categoria: 5},
  { value: 'Separação do Main Shaft da Gearbox', label: 'Separação do Main Shaft da Gearbox', categoria: 5},
  { value: 'Instalação do Main Shaft na Gearbox', label: 'Instalação do Main Shaft na Gearbox', categoria: 5},
  { value: 'Torque do Shrinck Disc', label: 'Torque do Shrinck Disc', categoria: 5},
  { value: 'Instalação da Gearbox', label: 'Instalação da Gearbox', categoria: 5},
  { value: 'Instalação do teto da Nacelle', label: 'Instalação do teto da Nacelle', categoria: 5},
  { value: 'Subida do rotor', label: 'Subida do rotor', categoria: 5},
  { value: 'Retirada do pega da pá de 6 horas', label: 'Retirada do pega da pá de 6 horas', categoria: 5},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 5},

  // Gerador
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 6},
  { value: 'Retirada do cooler do Gerador', label: 'Retirada do cooler do Gerador', categoria: 6},
  { value: 'Retirada do Gerador', label: 'Retirada do Gerador', categoria: 6},
  { value: 'Instalação do Gerador', label: 'Instalação do Gerador', categoria: 6},
  { value: 'Instalação do Cooler', label: 'Instalação do Cooler', categoria: 6},
  { value: 'Instalação do Teto', label: 'Instalação do Teto', categoria: 6},

  // Transformador
  { value: 'Retirada da mochila', label: 'Retirada da mochila', categoria: 7},
  { value: 'Retirada do transformador', label: 'Retirada do transformador', categoria: 7},
  { value: 'Instalação do tranformador', label: 'Instalação do tranformador', categoria: 7},
  { value: 'Instalação da mochila', label: 'Instalação da mochila', categoria: 7},

  // Pá
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 8},
  { value: 'Preparação para descida da Pá', label: 'Preparação para descida da Pá', categoria: 8},
  { value: 'Pega da pá', label: 'Pega da pá', categoria: 8},
  { value: 'Instalação do Spreader', label: 'Instalação do Spreader', categoria: 8},
  { value: 'Descida da pá', label: 'Descida da pá', categoria: 8},
  { value: 'Substituição dos studies', label: 'Substituição dos studies', categoria: 8},
  { value: 'Instalação da pá', label: 'Instalação da pá', categoria: 8},
  { value: 'Retirada do Spreader', label: 'Retirada do Spreader', categoria: 8},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 8},

  // Block 2
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 9},
  { value: 'Preparação para descida da Pá', label: 'Preparação para descida da Pá', categoria: 9},
  { value: 'Instalação do Spreader', label: 'Instalação do Spreader', categoria: 9},
  { value: 'Pega da pá', label: 'Pega da pá', categoria: 9},
  { value: 'Descida da pá', label: 'Descida da pá', categoria: 9},
  { value: 'Substituição dos studs', label: 'Substituição dos studs', categoria: 9},
  { value: 'Descida do extender', label: 'Descida do extender', categoria: 9},
  { value: 'Desmontagem do motor de giro', label: 'Desmontagem do motor de giro', categoria: 9},
  { value: 'Afastar a Gearbox', label: 'Afastar a Gearbox', categoria: 9},
  { value: 'Descida do B2', label: 'Descida do B2', categoria: 9},
  { value: 'Troca do eixo lento', label: 'Troca do eixo lento', categoria: 9},
  { value: 'Preparação do B2 para Subida', label: 'Preparação do B2 para Subida', categoria: 9},
  { value: 'Instalação do B2', label: 'Instalação do B2', categoria: 9},
  { value: 'Reconectar a Gearbox', label: 'Reconectar a Gearbox', categoria: 9},
  { value: 'Montagem do motor de giro', label: 'Montagem do motor de giro', categoria: 9},
  { value: 'Instalação do extender', label: 'Instalação do extender', categoria: 9},
  { value: 'Instalação da Pá', label: 'Instalação da Pá', categoria: 9},
  { value: 'Retirada do Spreader', label: 'Retirada do Spreader', categoria: 9},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 9},

  // Main Shaft
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 10},
  { value: 'Pega das pás de 10 e 2 horas', label: 'Pega das pás de 10 e 2 horas', categoria: 10},
  { value: 'Pega da pá de 6 horas', label: 'Pega da pá de 6 horas', categoria: 10},
  { value: 'Descida do rotor', label: 'Descida do rotor', categoria: 10},
  { value: 'Substituição dos Studs do rotor', label: 'Substituição dos Studs do rotor', categoria: 10},
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 10},
  { value: 'Retirada da Gearbox', label: 'Retirada da Gearbox', categoria: 10},
  { value: 'Quebra de torque do Shrinck Disc', label: 'Quebra de torque do Shrinck Disc', categoria: 10},
  { value: 'Separação do Main Shaft da Gearbox', label: 'Separação do Main Shaft da Gearbox', categoria: 10},
  { value: 'Instalação do Main Shaft na Gearbox', label: 'Instalação do Main Shaft na Gearbox', categoria: 10},
  { value: 'Torque do Shrinck Disc', label: 'Torque do Shrinck Disc', categoria: 10},
  { value: 'Instalação do defletor/ALC', label: 'Instalação do defletor/ALC', categoria: 10},
  { value: 'Instalação da Gearbox', label: 'Instalação da Gearbox', categoria: 10},
  { value: 'Instalação do teto da Nacelle', label: 'Instalação do teto da Nacelle', categoria: 10},
  { value: 'Subida do rotor', label: 'Subida do rotor', categoria: 10},
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 10},
  { value: 'Retirada do pega da pá de 6 horas', label: 'Retirada do pega da pá de 6 horas', categoria: 10},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 10},

  // Gearbox + Main Shaft
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 11},
  { value: 'Pega das pás de 10 e 2 horas', label: 'Pega das pás de 10 e 2 horas', categoria: 11},
  { value: 'Pega da pá de 6 horas', label: 'Pega da pá de 6 horas', categoria: 11},
  { value: 'Descida do rotor', label: 'Descida do rotor', categoria: 11},
  { value: 'Substituição dos Studs do rotor', label: 'Substituição dos Studs do rotor', categoria: 11},
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 11},
  { value: 'Retirada da Gearbox', label: 'Retirada da Gearbox', categoria: 11},
  { value: 'Quebra de torque do Shrinck Disc', label: 'Quebra de torque do Shrinck Disc', categoria: 11},
  { value: 'Separação do Main Shaft da Gearbox', label: 'Separação do Main Shaft da Gearbox', categoria: 11},
  { value: 'Instalação do Main Shaft na Gearbox', label: 'Instalação do Main Shaft na Gearbox', categoria: 11},
  { value: 'Torque do Shrinck Disc', label: 'Torque do Shrinck Disc', categoria: 11},
  { value: 'Instalação do defletor/ALC', label: 'Instalação do defletor/ALC', categoria: 11},
  { value: 'Instalação dos acessórios da Gearbox', label: 'Instalação dos acessórios da Gearbox', categoria: 11},
  { value: 'Instalação do sistema de freio', label: 'Instalação do sistema de freio', categoria: 11},
  { value: 'Instalação da Gearbox', label: 'Instalação da Gearbox', categoria: 11},
  { value: 'Instalação do teto da Nacelle', label: 'Instalação do teto da Nacelle', categoria: 11},
  { value: 'Subida do rotor', label: 'Subida do rotor', categoria: 11},
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 11},
  { value: 'Retirada do pega da pá de 6 horas', label: 'Retirada do pega da pá de 6 horas', categoria: 11},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 11},

  // Nacelle - X
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 12},
  { value: 'Pega das pás de 10 e 2 horas', label: 'Pega das pás de 10 e 2 horas', categoria: 12},
  { value: 'Pega da pá de 6 horas', label: 'Pega da pá de 6 horas', categoria: 12},
  { value: 'Descida do rotor', label: 'Descida do rotor', categoria: 12},
  { value: 'Substituição dos Studs do rotor', label: 'Substituição dos Studs do rotor', categoria: 12},
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 12},
  { value: 'Retirada da Gearbox + Main Shaft', label: 'Retirada da Gearbox + Main Shaft', categoria: 12},
  { value: 'Retirada do Gerador', label: 'Retirada do Gerador', categoria: 12},
  { value: 'Retirada da Nacelle', label: 'Retirada da Nacelle', categoria: 12},
  { value: 'Instalação da Nacelle', label: 'Instalação da Nacelle', categoria: 12},
  { value: 'Instalação do Gerador', label: 'Instalação do Gerador', categoria: 12},
  { value: 'Instalação da Gearbox + Main Shaft', label: 'Instalação da Gearbox + Main Shaft', categoria: 12},
  { value: 'Instalação do Teto da Nacelle', label: 'Instalação do Teto da Nacelle', categoria: 12},
  { value: 'Subida do rotor', label: 'Subida do rotor', categoria: 12},
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 12},
  { value: 'Retirada do pega da pá de 6 horas', label: 'Retirada do pega da pá de 6 horas', categoria: 12},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 12},

  // Carenagem da Nacelle - Up tower Repair
  { value: 'Retirada do teto da nacelle', label: 'Retirada do teto da nacelle', categoria: 13},
  { value: 'Desmontagem do ralador de queijo (piso)', label: 'Desmontagem do ralador de queijo (piso)', categoria: 13},
  { value: 'Instalação dos olhais na base da nacelle', label: 'Instalação dos olhais na base da nacelle', categoria: 13},
  { value: 'Instalação dos olhais da fibra', label: 'Instalação dos olhais da fibra', categoria: 13},
  { value: 'Retirada dos prisioneiros', label: 'Retirada dos prisioneiros', categoria: 13},
  { value: 'Retirada da fibra da Nacelle', label: 'Retirada da fibra da Nacelle', categoria: 13},
  { value: 'Preparação da fibra', label: 'Preparação da fibra', categoria: 13},
  { value: 'Instalação da fibra', label: 'Instalação da fibra', categoria: 13},
  { value: 'Instalação dos prisioneiros', label: 'Instalação dos prisioneiros', categoria: 13},
  { value: 'Retirada dos olhais da fibra', label: 'Retirada dos olhais da fibra', categoria: 13},
  { value: 'Retirada dos olhais da base da nacelle', label: 'Retirada dos olhais da base da nacelle', categoria: 13},
  { value: 'Instalação do ralador de queijo (piso)', label: 'Instalação do ralador de queijo (piso)', categoria: 13},
  { value: 'Instalação do teto da nacelle', label: 'Instalação do teto da nacelle', categoria: 13},

  // Carenagem da Nacelle - Down Tower
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 14},
  { value: 'Pega das pás de 10 e 2 horas', label: 'Pega das pás de 10 e 2 horas', categoria: 14},
  { value: 'Pega da pá de 6 horas', label: 'Pega da pá de 6 horas', categoria: 14},
  { value: 'Descida do rotor', label: 'Descida do rotor', categoria: 14},
  { value: 'Substituição dos Studs do rotor', label: 'Substituição dos Studs do rotor', categoria: 14},
  { value: 'Retirada do teto da Nacelle', label: 'Retirada do teto da Nacelle', categoria: 14},
  { value: 'Retirada da Gearbox + Main Shaft', label: 'Retirada da Gearbox + Main Shaft', categoria: 14},
  { value: 'Retirada do Gerador', label: 'Retirada do Gerador', categoria: 14},
  { value: 'Retirada da Nacelle', label: 'Retirada da Nacelle', categoria: 14},
  { value: 'Substituição da carenagem da nacelle', label: 'Substituição da carenagem da nacelle', categoria: 14},
  { value: 'Instalação da Nacelle', label: 'Instalação da Nacelle', categoria: 14},
  { value: 'Instalação do Gerador', label: 'Instalação do Gerador', categoria: 14},
  { value: 'Instalação da Gearbox + Main Shaft', label: 'Instalação da Gearbox + Main Shaft', categoria: 14},
  { value: 'Instalação do Teto da Nacelle', label: 'Instalação do Teto da Nacelle', categoria: 14},
  { value: 'Subida do rotor', label: 'Subida do rotor', categoria: 14},
  { value: 'Giro do Rotor', label: 'Giro do Rotor', categoria: 14},
  { value: 'Retirada do pega da pá de 6 horas', label: 'Retirada do pega da pá de 6 horas', categoria: 14},
  { value: 'Torque dos prisioneiros', label: 'Torque dos prisioneiros', categoria: 14},

  // Reparo UT do HSS
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 15},
  { value: 'Retirada de pinos da Tampa da Gearbox', label: 'Retirada de pinos da Tampa da Gearbox', categoria: 15},
  { value: 'Retirada de parafusos da Tampa da Gearbox', label: 'Retirada de parafusos da Tampa da Gearbox', categoria: 15},
  { value: 'Movimentação do cooler da gearbox', label: 'Movimentação do cooler da gearbox', categoria: 15},
  { value: 'Retirada da bomba do cooler da gearbox', label: 'Retirada da bomba do cooler da gearbox', categoria: 15},
  { value: 'Remoção de mangueiras e tubos da gearbox', label: 'Remoção de mangueiras e tubos da gearbox', categoria: 15},
  { value: 'Remoção do HSS', label: 'Remoção do HSS', categoria: 15},
  { value: 'Desmontagem e descida do HSS', label: 'Desmontagem e descida do HSS', categoria: 15},
  { value: 'Instalação do HSS', label: 'Instalação do HSS', categoria: 15},
  { value: 'Montagem dos rolamentos do HSS', label: 'Montagem dos rolamentos do HSS', categoria: 15},
  { value: 'Instalação de mangueiras e tubos da gearbox', label: 'Instalação de mangueiras e tubos da gearbox', categoria: 15},
  { value: 'Instalação da bomba do cooler da gearbox', label: 'Instalação da bomba do cooler da gearbox', categoria: 15},
  { value: 'Instalação do cooler da gearbox', label: 'Instalação do cooler da gearbox', categoria: 15},
  { value: 'Torque dos de parafusos da tampa da gearbox', label: 'Torque dos de parafusos da tampa da gearbox', categoria: 15},
  { value: 'Instalação dos pinos da tampa da gearbox', label: 'Instalação dos pinos da tampa da gearbox', categoria: 15},
  { value: 'Flushing da gearbox', label: 'Flushing da gearbox', categoria: 15},

  // Reparo UT do IMS
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 16},
  { value: 'Retirada de pinos da Tampa da Gearbox', label: 'Retirada de pinos da Tampa da Gearbox', categoria: 16},
  { value: 'Retirada de parafusos da Tampa da Gearbox', label: 'Retirada de parafusos da Tampa da Gearbox', categoria: 16},
  { value: 'Movimentação do cooler da gearbox', label: 'Movimentação do cooler da gearbox', categoria: 16},
  { value: 'Retirada da bomba do cooler da gearbox', label: 'Retirada da bomba do cooler da gearbox', categoria: 16},
  { value: 'Remoção de mangueiras e tubos da gearbox', label: 'Remoção de mangueiras e tubos da gearbox', categoria: 16},
  { value: 'Remoção da bomba do freio hidráulico', label: 'Remoção da bomba do freio hidráulico', categoria: 16},
  { value: 'Remoção do teto da nacelle', label: 'Remoção do teto da nacelle', categoria: 16},
  { value: 'Remoção da tampa da gearbox', label: 'Remoção da tampa da gearbox', categoria: 16},
  { value: 'Remoção do IMS', label: 'Remoção do IMS', categoria: 16},
  { value: 'Instalação do IMS', label: 'Instalação do IMS', categoria: 16},
  { value: 'Instalação dos rolamentos de IMS', label: 'Instalação dos rolamentos de IMS', categoria: 16},
  { value: 'Instalação da tampa da gearbox', label: 'Instalação da tampa da gearbox', categoria: 16},
  { value: 'Instalação do teto da nacelle', label: 'Instalação do teto da nacelle', categoria: 16},
  { value: 'Instalação da bomba do freio hidráulico', label: 'Instalação da bomba do freio hidráulico', categoria: 16},
  { value: 'Instalação de mangueiras e tubos da gearbox', label: 'Instalação de mangueiras e tubos da gearbox', categoria: 16},
  { value: 'Instalação da bomba do cooler da gearbox', label: 'Instalação da bomba do cooler da gearbox', categoria: 16},
  { value: 'Instalação do cooler da gearbox', label: 'Instalação do cooler da gearbox', categoria: 16},
  { value: 'Torque dos de parafusos da tampa da gearbox', label: 'Torque dos de parafusos da tampa da gearbox', categoria: 16},
  { value: 'Instalação dos pinos da tampa da gearbox', label: 'Instalação dos pinos da tampa da gearbox', categoria: 16},
  { value: 'Flushing da gearbox', label: 'Flushing da gearbox', categoria: 16},

  // Reparo UT do LSS
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 17},
  { value: 'Retirada de pinos da Tampa da Gearbox', label: 'Retirada de pinos da Tampa da Gearbox', categoria: 17},
  { value: 'Retirada de parafusos da Tampa da Gearbox', label: 'Retirada de parafusos da Tampa da Gearbox', categoria: 17},
  { value: 'Movimentação do cooler da gearbox', label: 'Movimentação do cooler da gearbox', categoria: 17},
  { value: 'Retirada da bomba do cooler da gearbox', label: 'Retirada da bomba do cooler da gearbox', categoria: 17},
  { value: 'Remoção de mangueiras e tubos da gearbox', label: 'Remoção de mangueiras e tubos da gearbox', categoria: 17},
  { value: 'Remoção da bomba do freio hidráulico', label: 'Remoção da bomba do freio hidráulico', categoria: 17},
  { value: 'Remoção do teto da nacelle', label: 'Remoção do teto da nacelle', categoria: 17},
  { value: 'Remoção da tampa da gearbox', label: 'Remoção da tampa da gearbox', categoria: 17},
  { value: 'Remoção do slip de comunicação', label: 'Remoção do slip de comunicação', categoria: 17},
  { value: 'Remoção do LSS', label: 'Remoção do LSS', categoria: 17},
  { value: 'Instalação do LSS', label: 'Instalação do LSS', categoria: 17},
  { value: 'Instalação do slip de comunicação', label: 'Instalação do slip de comunicação', categoria: 17},
  { value: 'Instalação dos rolamentos de LSS', label: 'Instalação dos rolamentos de LSS', categoria: 17},
  { value: 'Instalação da tampa da gearbox', label: 'Instalação da tampa da gearbox', categoria: 17},
  { value: 'Instalação do teto da nacelle', label: 'Instalação do teto da nacelle', categoria: 17},
  { value: 'Instalação da bomba do freio hidráulico', label: 'Instalação da bomba do freio hidráulico', categoria: 17},
  { value: 'Instalação de mangueiras e tubos da gearbox', label: 'Instalação de mangueiras e tubos da gearbox', categoria: 17},
  { value: 'Instalação da bomba do cooler da gearbox', label: 'Instalação da bomba do cooler da gearbox', categoria: 17},
  { value: 'Instalação do cooler da gearbox', label: 'Instalação do cooler da gearbox', categoria: 17},
  { value: 'Torque dos de parafusos da tampa da gearbox', label: 'Torque dos de parafusos da tampa da gearbox', categoria: 17},
  { value: 'Instalação dos pinos da tampa da gearbox', label: 'Instalação dos pinos da tampa da gearbox', categoria: 17},
  { value: 'Flushing da gearbox', label: 'Flushing da gearbox', categoria: 17},

  // Reparo UT dos rolamentos HSS (Lado Gerador)
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 18},
  { value: 'Remoção dos rolamentos HSS', label: 'Remoção dos rolamentos HSS', categoria: 18},
  { value: 'Instalação dos rolamentos do HSS', label: 'Instalação dos rolamentos do HSS', categoria: 18},
  { value: 'Instalação do disco de freio', label: 'Instalação do disco de freio', categoria: 18},

  // Reparo UT dos rolamentos IMS (Lado Gerador)
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 19},
  { value: 'Remoção dos rolamentos IMS', label: 'Remoção dos rolamentos IMS', categoria: 19},
  { value: 'Instalação dos rolamentos do IMS', label: 'Instalação dos rolamentos do IMS', categoria: 19},
  { value: 'Instalação do disco de freio', label: 'Instalação do disco de freio', categoria: 19},

  // Reparo UT dos rolamentos LSS (Lado Gerador)
  { value: 'Retirada do disco de freio', label: 'Retirada do disco de freio', categoria: 20},
  { value: 'Remoção do slip de comunicação', label: 'Remoção do slip de comunicação', categoria: 20},
  { value: 'Remoção dos rolamentos LSS', label: 'Remoção dos rolamentos LSS', categoria: 20},
  { value: 'Instalação dos rolamentos do LSS', label: 'Instalação dos rolamentos do LSS', categoria: 20},
  { value: 'Instalação do slip de comunicação', label: 'Instalação do slip de comunicação', categoria: 20},
  { value: 'Instalação do disco de freio', label: 'Instalação do disco de freio', categoria: 20},

  // Reparo UT de Rolamento Gerador DE
  { value: 'Remoção da cunha do acoplamento', label: 'Remoção da cunha do acoplamento', categoria: 21},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 21},
  { value: 'Remoção do Rolamento (DE)', label: 'Remoção do Rolamento (DE)', categoria: 21},
  { value: 'Instalação do Rolamento (DE)', label: 'Instalação do Rolamento (DE)', categoria: 21},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 21},
  { value: 'Instalação da cunha do acoplamento', label: 'Instalação da cunha do acoplamento', categoria: 21},

  // Reparo UT de Rolamento Gerador NDE
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 22},
  { value: 'Remoção das caixas de ligação', label: 'Remoção das caixas de ligação', categoria: 22},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 22},
  { value: 'Remoção do Rolamento (NDE)', label: 'Remoção do Rolamento (NDE)', categoria: 22},
  { value: 'Instalação do Rolamento (NDE)', label: 'Instalação do Rolamento (NDE)', categoria: 22},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 22},
  { value: 'Instalação das caixas de ligação', label: 'Instalação das caixas de ligação', categoria: 22},
  { value: 'Instalaçãoo do Slip de potência', label: 'Instalaçãoo do Slip de potência', categoria: 22},

  // Reparo UT de Rolamento Gerador DE + NDE
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 23},
  { value: 'Remoção das caixas de ligação', label: 'Remoção das caixas de ligação', categoria: 23},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 23},
  { value: 'Remoção da cunha do acoplamento', label: 'Remoção da cunha do acoplamento', categoria: 23},
  { value: 'Remoção do Rolamento (NDE)', label: 'Remoção do Rolamento (NDE)', categoria: 23},
  { value: 'Remoção do Rolamento (DE)', label: 'Remoção do Rolamento (DE)', categoria: 23},
  { value: 'Instalação do Rolamento (DE)', label: 'Instalação do Rolamento (DE)', categoria: 23},
  { value: 'Instalação do Rolamento (NDE)', label: 'Instalação do Rolamento (NDE)', categoria: 23},
  { value: 'Instalação da cunha do acoplamento', label: 'Instalação da cunha do acoplamento', categoria: 23},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 23},
  { value: 'Instalação das caixas de ligação', label: 'Instalação das caixas de ligação', categoria: 23},
  { value: 'Instalação do Slip de potência', label: 'Instalação do Slip de potência', categoria: 23},

  // Reparo UT dos redutores do Yaw
  { value: 'Remoção de plataformas da nacelle', label: 'Remoção de plataformas da nacelle', categoria: 24},
  { value: 'Remoção de parafusos do redutor', label: 'Remoção de parafusos do redutor', categoria: 24},
  { value: 'Remoção do teto da nacelle', label: 'Remoção do teto da nacelle', categoria: 24},
  { value: 'Remoção do redutor do Yaw', label: 'Remoção do redutor do Yaw', categoria: 24},
  { value: 'Instalação do redutor do Yaw', label: 'Instalação do redutor do Yaw', categoria: 24},
  { value: 'Instalação do teto da nacelle', label: 'Instalação do teto da nacelle', categoria: 24},
  { value: 'Torque de parafusos do redutor', label: 'Torque de parafusos do redutor', categoria: 24},
  { value: 'Instalação de plataformas da nacelle', label: 'Instalação de plataformas da nacelle', categoria: 24},

  // Re-Lead do Gerador
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 25},
  { value: 'Remoção das caixas de ligação', label: 'Remoção das caixas de ligação', categoria: 25},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 25},
  { value: 'Re-lead do gerador', label: 'Re-lead do gerador', categoria: 25},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 25},
  { value: 'Instalação das caixas de ligação', label: 'Instalação das caixas de ligação', categoria: 25},
  { value: 'Instalaçãoo do Slip de potência', label: 'Instalaçãoo do Slip de potência', categoria: 25},

  // Reparo UT de componentes do freio secundário
  { value: 'Remoção da pinça de freio', label: 'Remoção da pinça de freio', categoria: 26},
  { value: 'Remoção do disco de freio', label: 'Remoção do disco de freio', categoria: 26},
  { value: 'Remoção do caliper', label: 'Remoção do caliper', categoria: 26},
  { value: 'Remoção da bomba hidráulica', label: 'Remoção da bomba hidráulica', categoria: 26},
  { value: 'Instalação da bomba hidráulica', label: 'Instalação da bomba hidráulica', categoria: 26},
  { value: 'Instalação do caliper', label: 'Instalação do caliper', categoria: 26},
  { value: 'Instalação do disco de freio', label: 'Instalação do disco de freio', categoria: 26},
  { value: 'Instalação da pinça de freio', label: 'Instalação da pinça de freio', categoria: 26},

  // Reparo UT do slip do gerador
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 27},
  { value: 'Instalaçãoo do Slip de potência', label: 'Instalaçãoo do Slip de potência', categoria: 27},

  // Reparo UT de Bus Bar
  { value: 'Remoção das telas de proteção', label: 'Remoção das telas de proteção', categoria: 28},
  { value: 'Desconecções do bus bar', label: 'Desconecções do bus bar', categoria: 28},
  { value: 'Pega do bus bar', label: 'Pega do bus bar', categoria: 28},
  { value: 'Remoção e descida do bus bar', label: 'Remoção e descida do bus bar', categoria: 28},
  { value: 'Pega e subida do bus bar', label: 'Pega e subida do bus bar', categoria: 28},
  { value: 'Instalação do bus bar', label: 'Instalação do bus bar', categoria: 28},
  { value: 'Reconecções e isolamento do bus bar', label: 'Reconecções e isolamento do bus bar', categoria: 28},
  { value: 'Instalação das telas de proteção', label: 'Instalação das telas de proteção', categoria: 28},

  // Reparo DT do HSS
  { value: 'Retirada de pinos da Tampa da Gearbox', label: 'Retirada de pinos da Tampa da Gearbox', categoria: 29},
  { value: 'Retirada de parafusos da Tampa da Gearbox', label: 'Retirada de parafusos da Tampa da Gearbox', categoria: 29},
  { value: 'Remoção de mangueiras e tubos da gearbox', label: 'Remoção de mangueiras e tubos da gearbox', categoria: 29},
  { value: 'Remoção do HSS', label: 'Remoção do HSS', categoria: 29},
  { value: 'Desmontagem do HSS', label: 'Desmontagem do HSS', categoria: 29},
  { value: 'Instalação do HSS', label: 'Instalação do HSS', categoria: 29},
  { value: 'Montagem dos rolamentos do HSS', label: 'Montagem dos rolamentos do HSS', categoria: 29},
  { value: 'Instalação de mangueiras e tubos da gearbox', label: 'Instalação de mangueiras e tubos da gearbox', categoria: 29},
  { value: 'Torque dos de parafusos da tampa da gearbox', label: 'Torque dos de parafusos da tampa da gearbox', categoria: 29},
  { value: 'Instalação dos pinos da tampa da gearbox', label: 'Instalação dos pinos da tampa da gearbox', categoria: 29},

  // Reparo DT do IMS
  { value: 'Retirada de pinos da Tampa da Gearbox', label: 'Retirada de pinos da Tampa da Gearbox', categoria: 30},
  { value: 'Retirada de parafusos da Tampa da Gearbox', label: 'Retirada de parafusos da Tampa da Gearbox', categoria: 30},
  { value: 'Remoção de mangueiras e tubos da gearbox', label: 'Remoção de mangueiras e tubos da gearbox', categoria: 30},
  { value: 'Remoção da tampa da gearbox', label: 'Remoção da tampa da gearbox', categoria: 30},
  { value: 'Remoção do IMS', label: 'Remoção do IMS', categoria: 30},
  { value: 'Instalação do IMS', label: 'Instalação do IMS', categoria: 30},
  { value: 'Instalação dos rolamentos de IMS', label: 'Instalação dos rolamentos de IMS', categoria: 30},
  { value: 'Instalação da tampa da gearbox', label: 'Instalação da tampa da gearbox', categoria: 30},
  { value: 'Instalação de mangueiras e tubos da gearbox', label: 'Instalação de mangueiras e tubos da gearbox', categoria: 30},
  { value: 'Torque dos de parafusos da tampa da gearbox', label: 'Torque dos de parafusos da tampa da gearbox', categoria: 30},
  { value: 'Instalação dos pinos da tampa da gearbox', label: 'Instalação dos pinos da tampa da gearbox', categoria: 30},

  // Reparo DT do LSS
  { value: 'Retirada de pinos da Tampa da Gearbox', label: 'Retirada de pinos da Tampa da Gearbox', categoria: 31},
  { value: 'Retirada de parafusos da Tampa da Gearbox', label: 'Retirada de parafusos da Tampa da Gearbox', categoria: 31},
  { value: 'Remoção de mangueiras e tubos da gearbox', label: 'Remoção de mangueiras e tubos da gearbox', categoria: 31},
  { value: 'Remoção da tampa da gearbox', label: 'Remoção da tampa da gearbox', categoria: 31},
  { value: 'Remoção do LSS', label: 'Remoção do LSS', categoria: 31},
  { value: 'Instalação do LSS', label: 'Instalação do LSS', categoria: 31},
  { value: 'Instalação dos rolamentos de LSS', label: 'Instalação dos rolamentos de LSS', categoria: 31},
  { value: 'Instalação da tampa da gearbox', label: 'Instalação da tampa da gearbox', categoria: 31},
  { value: 'Instalação de mangueiras e tubos da gearbox', label: 'Instalação de mangueiras e tubos da gearbox', categoria: 31},
  { value: 'Torque dos de parafusos da tampa da gearbox', label: 'Torque dos de parafusos da tampa da gearbox', categoria: 31},
  { value: 'Instalação dos pinos da tampa da gearbox', label: 'Instalação dos pinos da tampa da gearbox', categoria: 31},

  // Reparo UT dos rolamentos HSS (Lado Gerador)
  { value: 'Remoção dos rolamentos HSS', label: 'Remoção dos rolamentos HSS', categoria: 32},
  { value: 'Instalação dos rolamentos do HSS', label: 'Instalação dos rolamentos do HSS', categoria: 32},

  // Reparo UT dos rolamentos IMS (Lado Gerador)
  { value: 'Remoção dos rolamentos IMS', label: 'Remoção dos rolamentos IMS', categoria: 33},
  { value: 'Instalação dos rolamentos do IMS', label: 'Instalação dos rolamentos do IMS', categoria: 33},

  // Reparo UT dos rolamentos LSS (Lado Gerador)
  { value: 'Remoção dos rolamentos LSS', label: 'Remoção dos rolamentos LSS', categoria: 34},
  { value: 'Instalação dos rolamentos do LSS', label: 'Instalação dos rolamentos do LSS', categoria: 34},

  // Reparo UT de Rolamento Gerador DE
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 35},
  { value: 'Remoção do Rolamento (DE)', label: 'Remoção do Rolamento (DE)', categoria: 35},
  { value: 'Instalação do Rolamento (DE)', label: 'Instalação do Rolamento (DE)', categoria: 35},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 35},

  // Reparo UT de Rolamento Gerador NDE
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 36},
  { value: 'Remoção das caixas de ligação', label: 'Remoção das caixas de ligação', categoria: 36},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 36},
  { value: 'Remoção do Rolamento (NDE)', label: 'Remoção do Rolamento (NDE)', categoria: 36},
  { value: 'Instalação do Rolamento (NDE)', label: 'Instalação do Rolamento (NDE)', categoria: 36},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 36},
  { value: 'Instalação das caixas de ligação', label: 'Instalação das caixas de ligação', categoria: 36},
  { value: 'Instalaçãoo do Slip de potência', label: 'Instalaçãoo do Slip de potência', categoria: 36},

  // Reparo UT de Rolamento Gerador DE + NDE
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 37},
  { value: 'Remoção das caixas de ligação', label: 'Remoção das caixas de ligação', categoria: 37},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 37},
  { value: 'Remoção do Rolamento (NDE)', label: 'Remoção do Rolamento (NDE)', categoria: 37},
  { value: 'Remoção do Rolamento (DE)', label: 'Remoção do Rolamento (DE)', categoria: 37},
  { value: 'Instalação do Rolamento (DE)', label: 'Instalação do Rolamento (DE)', categoria: 37},
  { value: 'Instalação do Rolamento (NDE)', label: 'Instalação do Rolamento (NDE)', categoria: 37},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 37},
  { value: 'Instalação das caixas de ligação', label: 'Instalação das caixas de ligação', categoria: 37},
  { value: 'Instalação do Slip de potência', label: 'Instalação do Slip de potência', categoria: 37},

  // Re-Lead do Gerador
  { value: 'Remoção do Slip de potência', label: 'Remoção do Slip de potência', categoria: 38},
  { value: 'Remoção das caixas de ligação', label: 'Remoção das caixas de ligação', categoria: 38},
  { value: 'Remoção da tampa', label: 'Remoção da tampa', categoria: 38},
  { value: 'Re-lead do gerador', label: 'Re-lead do gerador', categoria: 38},
  { value: 'Instalação da tampa', label: 'Instalação da tampa', categoria: 38},
  { value: 'Instalação das caixas de ligação', label: 'Instalação das caixas de ligação', categoria: 38},
  { value: 'Instalaçãoo do Slip de potência', label: 'Instalaçãoo do Slip de potência', categoria: 38},

  // Troca do rolamento do Main Shaft
  { value: 'Retirada do Pillow Block', label: 'Retirada do Pillow Block', categoria: 39},
  { value: 'Corte da pista esterna do rolamento', label: 'Corte da pista esterna do rolamento', categoria: 39},
  { value: 'Retirada da pista interna com o indutor', label: 'Retirada da pista interna com o indutor', categoria: 39},
  { value: 'Corte da pista interna do rolamento', label: 'Corte da pista interna do rolamento', categoria: 39},
  { value: 'Retirada do labirinto', label: 'Retirada do labirinto', categoria: 39},
  { value: 'Montagem do labirinto interno', label: 'Montagem do labirinto interno', categoria: 39},
  { value: 'Montagem do pillow block no rolamento', label: 'Montagem do pillow block no rolamento', categoria: 39},
  { value: 'Aquecimento do pillow block com rolamento', label: 'Aquecimento do pillow block com rolamento', categoria: 39},
  { value: 'Montagem do rolamento no eixo principal', label: 'Montagem do rolamento no eixo principal', categoria: 39},

  // Reparo do B2
  { value: 'Desmontagem da carenagem', label: 'Desmontagem da carenagem', categoria: 40},
  { value: 'Retirada do eixo lento', label: 'Retirada do eixo lento', categoria: 40},
  { value: 'Retirada da tampa do labirinto dianteiro', label: 'Retirada da tampa do labirinto dianteiro', categoria: 40},
  { value: 'Montagem da unidade hidráulica dianteiro', label: 'Montagem da unidade hidráulica dianteiro', categoria: 40},
  { value: 'Retirada do Hub', label: 'Retirada do Hub', categoria: 40},
  { value: 'Retirada da pista externa dianteira do rolamento do Hub', label: 'Retirada da pista externa dianteira do rolamento do Hub', categoria: 40},
  { value: 'Limpeza do HUB', label: 'Limpeza do HUB', categoria: 40},
  { value: 'Retirada da pista externa traseira do rolamento do Hub', label: 'Retirada da pista externa traseira do rolamento do Hub', categoria: 40},
  { value: 'Limpeza do bastidor ', label: 'Limpeza do bastidor ', categoria: 40},
  { value: 'Corte da gaiola e retirada dos rolos', label: 'Corte da gaiola e retirada dos rolos', categoria: 40},
  { value: 'Aquecimento e retirada da pista interna do rolamento do bastidor', label: 'Aquecimento e retirada da pista interna do rolamento do bastidor', categoria: 40},
  { value: 'Retirada do labirinto', label: 'Retirada do labirinto', categoria: 40},
  { value: 'Montagem do labirinto', label: 'Montagem do labirinto', categoria: 40},
  { value: 'Aquecimento e montagem do rolamento do bastidor', label: 'Aquecimento e montagem do rolamento do bastidor', categoria: 40},
  { value: 'Lubrificação do rolamento', label: 'Lubrificação do rolamento', categoria: 40},
  { value: 'Resfriamento em gelo seco da pista externa dianteira', label: 'Resfriamento em gelo seco da pista externa dianteira', categoria: 40},
  { value: 'Montagem da pista externa dianteira', label: 'Montagem da pista externa dianteira', categoria: 40},
  { value: 'Acoplamento de Bastidor e Hub ', label: 'Acoplamento de Bastidor e Hub ', categoria: 40},
  { value: 'Montagem do rolamento superior', label: 'Montagem do rolamento superior', categoria: 40},
  { value: 'Instalação do labirinto superior', label: 'Instalação do labirinto superior', categoria: 40},
  { value: 'Ajustes das folgas', label: 'Ajustes das folgas', categoria: 40},
  { value: 'Montagem da tampa do labirinto', label: 'Montagem da tampa do labirinto', categoria: 40},
  { value: 'Instalação do eixo lento', label: 'Instalação do eixo lento', categoria: 40},
  { value: 'Montagem da carenagem do B2', label: 'Montagem da carenagem do B2', categoria: 40},

];

const complexo_eolico = [
  { value: 'UDV', label: 'Uniao dos Ventos' },
  { value: 'V3', label: 'Ventos 3' },
  { value: 'CPFL', label: 'CPFL' },
  { value: 'ASABRANCA', label: 'Asa Branca' },
  { value: 'RIACHAO', label: 'Riachão' },
  { value: 'COPEL', label: 'COPEL' },
  { value: 'RDV', label: 'RDV' },
  { value: 'CHAPADAI', label: 'Chapada I' },
  { value: 'CHAPADAII', label: 'Chapada II&III' },
  { value: 'CALDEIRAO', label: 'Caldeirão' },
  { value: 'OMEGA2', label: 'Delta 2' },
  { value: 'OMEGA3', label: 'Delta 3' },
  { value: 'AMONTADA', label: 'Amontada' },
  { value: 'TRAIRI', label: 'Trairi' },
  { value: 'ELETROSUL', label: 'Eletrosul' },
  { value: 'PONTAL', label: 'Pontal' },
  { value: 'SENANDES', label: 'Senandes' },
  { value: 'SANTABRIGIDA', label: 'Sta Brigida' },
  { value: 'SAOCLEMENTE', label: 'São Clemente' },
  { value: 'PEC', label: 'PEC' },
  { value: 'BW', label: 'Brazil Wind' },
  { value: 'BIOENERGY', label: 'Bio Energy' },
  { value: 'CAETITE', label: 'Caetite' },
  { value: 'UMBURANAS', label: 'Umburanas' },
  { value: 'BROTAS', label: 'Brotas' },
  { value: 'CAMPOLARGO', label: 'Campo Largo' },
  { value: 'CER', label: 'CER' },
  { value: 'TERRAFORM', label: 'Brookfield' },
  { value: 'TIANGUA', label: 'Tianguá' },
  { value: 'RENOVA', label: 'AES' }
];

class Repair extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyLabor: 1, keyMaterial: 1, keyParada: 1,
      labor: [], material: [], paradas: [], lista_problemcode: [], lista_resolutioncode: [], lista_techs: [],
      numero_sr: '', complexo_eolico: '', tiporepair: '', subcategoria: '', sso_tecnico: '', paccase: '', numerotecnicos: 0, problemcode: 'GENERAL', resolutioncode: 'REPAIR', novo_tech: '',
      data_do_debrief: new Date().toISOString(),
      open: false, vertical: 'top', horizontal: 'center',
    };

  }

  getProblemCode() {
    var ref = fire.database().ref('problemcode');
    ref.once('value').then((snapshot) => {
        this.setState({ lista_problemcode: snapshot.val() });
    });
  }
  getResolutionCode() {
    var ref = fire.database().ref('resolutioncode');
    ref.once('value').then((snapshot) => {
        this.setState({ lista_resolutioncode: snapshot.val() });
    });
  }
  getSubcategoria() {
    let _subcategoria_selecionada = subcategoria.find(subcategoria => subcategoria.value === this.state.subcategoria)
    return _subcategoria_selecionada
  }

  adicionaNovoTech() {
    let _tech = {};
    _tech.label = this.state.novo_tech;
    _tech.key = _tech.label;

    this.setState(prevState => ({
      lista_techs: [...prevState.lista_techs, _tech],
      novo_tech: ''
    }))

  };
  handleDeleteTecnico = data => () => {
    this.setState(state => {
      const lista_techs = [...state.lista_techs];
      const chipToDelete = lista_techs.indexOf(data);
      lista_techs.splice(chipToDelete, 1);
      return { lista_techs };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ open: true });
    let testekey = this.state.numero_sr + '' + this.state.data_do_debrief.substring(0,19)
    fire.database().ref('debrief_mce/' + testekey).set(
        { numero_sr: this.state.numero_sr, sso_tecnico: this.state.lista_techs, data_do_debrief: this.state.data_do_debrief, labor: this.state.labor, material: this.state.material, paradas: this.state.paradas, complexo: this.state.complexo_eolico, problemcode: this.state.problemcode, resolutioncode: this.state.resolutioncode, key: testekey, tiporepair: this.state.tiporepair, subcategoria: this.state.subcategoria, paccase: this.state.paccase, numerotecnicos: this.state.numerotecnicos }
    );
    this.setState({ numero_sr: '', lista_techs: [], paccase: '', numerotecnicos: '', labor: [], paradas: [], material: [] });
  };

  handleChange = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };

  handleClose = () => { this.setState({ open: false }); };

  handleMudancaAtividade = idx => evt => {
    if(evt.target.name === 'subcategoria') {
      const nova_atividade = this.state.labor.map((atividade, sidx) => {
        if (idx !== sidx) return atividade;
        return { ...atividade, [evt.target.name]: evt.target.value };
      });
      this.setState({ labor: nova_atividade });
    }
    else {
      const nova_atividade = this.state.labor.map((atividade, sidx) => {
        if (idx !== sidx) return atividade;
        return { ...atividade, [evt.target.id]: evt.target.value };
      });
      this.setState({ labor: nova_atividade });
    }
  };

  handleMudancaAtividadeLaborCode = idx => evt => {
    const nova_atividade = this.state.labor.map((atividade, sidx) => {
      if (idx !== sidx) return atividade;
      return { ...atividade, [evt.target.name]: evt.target.value };
    });
    this.setState({ labor: nova_atividade });
  };

  handleMudancaParts = idx => evt => {
    if(evt.target.name === 'tipopeca') {
      const nova_parts = this.state.material.map((parts, sidx) => {
        if (idx !== sidx) return parts;
        return { ...parts, [evt.target.name]: evt.target.value };
      });
      this.setState({ material: nova_parts });
    }
    else {
      const nova_parts = this.state.material.map((parts, sidx) => {
        if (idx !== sidx) return parts;
        return { ...parts, [evt.target.id]: evt.target.value };
      });
      this.setState({ material: nova_parts });
    }
  };

  handleMudancaParadas = idx => evt => {
    if(evt.target.name === 'tipo_parada' || evt.target.name === 'subcategoria_parada') {
      const nova_parada = this.state.paradas.map((parada, sidx) => {
        if (idx !== sidx) return parada;
        return { ...parada, [evt.target.name]: evt.target.value };
      });
      this.setState({ paradas: nova_parada });
    }
    else {
      const nova_parada = this.state.paradas.map((parada, sidx) => {
        if (idx !== sidx) return parada;
        return { ...parada, [evt.target.id]: evt.target.value };
      });
      this.setState({ paradas: nova_parada });
    }
  };

  handleRemoveAtividade = idx => () => { this.setState((prevState, props) => ({ labor: this.state.labor.filter((s, sidx) => idx !== sidx), keyLabor: prevState.keyLabor-1 })); };

  handleRemoveParts = idx => () => { this.setState((prevState, props) => ({ material: this.state.material.filter((s, sidx) => idx !== sidx), keyMaterial: prevState.keyMaterial-1 })); };

  handleRemoveParada = idx => () => { this.setState((prevState, props) => ({ paradas: this.state.paradas.filter((s, sidx) => idx !== sidx), keyParada: prevState.keyParada-1 })); };

  adicionaNovoLabor = () => {
      let _novolabor = { key: this.state.keyLabor, inicio: new Date().toISOString().substring(0,16), fim: new Date().toISOString().substring(0,16), subcategoria: '', descricao: '' }
      this.setState((prevState, props) => ({ labor: this.state.labor.concat([_novolabor]), keyLabor: _novolabor.key + 1 }));
  };

  adicionaNovaPart = () => {
      let _novapart = { key: this.state.keyMaterial, partnumber: '', serialnumber:'', quantidade: 1, partnumberout: '', serialnumberout:'', quantidadeout: 1, tipopeca: 'Order' }
      this.setState((prevState, props) => ({ material: this.state.material.concat([_novapart]), keyMaterial: _novapart.key + 1 }));
  };

  adicionaNovaParada = () => {
      let _novaparada = { key: this.state.keyParada, inicio: new Date().toISOString().substring(0,16), fim: new Date().toISOString().substring(0,16), tipo_parada: '', subcategoria_parada: ''}
      this.setState((prevState, props) => ({ paradas: this.state.paradas.concat([_novaparada]), keyParada: _novaparada.key + 1 }));
  };

  handleMudancaWindfarm(novo_parque) { this.atualizaTurbinas(novo_parque) }
  handleMudancaStatus(novo_status) { this.setState({ filtro: novo_status, status_turbinas: this.state._status_turbinas_backup.filter(turbina => turbina.currentState === novo_status)}); }

  componentWillMount() {
     this.getProblemCode();
     this.getResolutionCode();
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    var handleMudancaWindfarm = this.handleMudancaWindfarm;
    var handleMudancaStatus = this.handleMudancaStatus;

    if(this.state.subcategoria) {
      this.getSubcategoria()
    }

    return (
      <div className="Repair">
        <Header handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />
        <header className="Repair-header">
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> INFORMAÇOES GERAIS: </Typography> </Paper>
            <TextField id="numero_sr" required label="Numero SR" variant="standard" className={classes.textField} value={this.state.numero_sr} onChange={this.handleChange('numero_sr')} margin="normal" />

            <TextField id="complexo_eolico" select required label="Parque Eolico" className={classes.textField} value={this.state.complexo_eolico} onChange={this.handleChange('complexo_eolico')} margin="normal">
              {complexo_eolico.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>

            <TextField fullWidth id="novo_tech" label="Add novo tech" variant="standard" className={classes.textField} value={this.state.novo_tech} onChange={this.handleChange('novo_tech')} margin="normal" />
            <Button onClick={() => {this.adicionaNovoTech()}} color="secondary"> +Tech </Button>
            <Paper className={classes.root}>
              {this.state.lista_techs.map(data => { return ( <Chip key={data.key} icon={<TagFacesIcon />} label={data.label} onDelete={this.handleDeleteTecnico(data)} className={classes.chip} /> ); })}
            </Paper>


            <TextField id="paccase" label="PAC Case" variant="standard" className={classes.textField} value={this.state.paccase} onChange={this.handleChange('paccase')} margin="normal" />

            <TextField required id="numerotecnicos" label="Numero Tecnicos" variant="standard" type="number" className={classes.textField} value={this.state.numerotecnicos} onChange={this.handleChange('numerotecnicos')} margin="normal" />

            <TextField id="problemcode" select required label="Problem Code" className={classes.textField} value={this.state.problemcode} onChange={this.handleChange('problemcode')} margin="normal">
              {this.state.lista_problemcode.map(option => ( <MenuItem key={option.key} value={option.value}> {option.value} </MenuItem> ))}
            </TextField>

            <TextField id="resolutioncode" select required label="Resolution Code" className={classes.textField} value={this.state.resolutioncode} onChange={this.handleChange('resolutioncode')} margin="normal">
              {this.state.lista_resolutioncode.map(option => ( <MenuItem key={option.key} value={option.value}> {option.value} </MenuItem> ))}
            </TextField>

            <TextField id="tiporepair" select required label="Tipo intervenção" className={classes.textField} value={this.state.tiporepair} onChange={this.handleChange('tiporepair')} margin="normal">
              { tiporepair.map(option => ( <MenuItem key={option.value} value={option.categoria}> {option.value} </MenuItem> )) }
            </TextField>

            <TextField id="subcategoria" select required label="Subcategoria" className={classes.textField} value={this.state.subcategoria} onChange={this.handleChange('subcategoria')} margin="normal">
              { subcategoria.filter(option => { return option.categoria === this.state.tiporepair }).map(option => ( <MenuItem key={option.value} value={option.value}> {option.value} </MenuItem> )) }
            </TextField>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> HORAS UTILIZADAS: </Typography> </Paper>
            {this.state.labor.map((atividade, idx) => (
                <div key={atividade.key}>
                    <Paper className={classes.detalhes} elevation={1}>
                        <Typography variant="p" component="p"> Atividade-{atividade.key} </Typography>
                    </Paper>
                    <TextField id="inicio" required label="Inicio atividade" type="datetime-local" variant="standard" value={atividade.inicio} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="fim" required label="Fim atividade" type="datetime-local" variant="standard" value={atividade.fim} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="subcategoria" name="subcategoria" select required label="Atividade" className={classes.textField} value={atividade.subcategoria} onChange={this.handleMudancaAtividade(idx)} margin="normal">
                      {
                        atividades.filter(option => { return option.categoria === this.getSubcategoria().subcategoria }).map(option => ( <MenuItem key={option.value} value={option.value}> {option.value} </MenuItem> ))
                      }
                    </TextField>
                    <TextField id="descricao" label="Descricao" type="standard" variant="standard" value={atividade.descricao} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <IconButton onClick={this.handleRemoveAtividade(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovoLabor()}} color="secondary"> +Labor </Button>

            <Divider />
            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> MATERIAIS/PEÇAS : </Typography> </Paper>
            {this.state.material.map((material, idx) => (
                <div key={material.key}>
                    <Paper className={classes.detalhes} elevation={1}> <Typography variant="p" component="p"> Peça-{material.key} </Typography> </Paper>
                    <TextField id="partnumber" label="Part Number In" type="standard" variant="standard" value={material.partnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumber" label="Serial Number In" type="standard" variant="standard" value={material.serialnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidade" label="Quantidade In" type="number" variant="standard" value={material.quantidade} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="partnumberout" label="Part Number Out" type="standard" variant="standard" value={material.partnumberout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumberout" label="Serial Number Out" type="standard" variant="standard" value={material.serialnumberout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidadeout" label="Quantidade Out" type="number" variant="standard" value={material.quantidadeout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <IconButton onClick={this.handleRemoveParts(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovaPart()}} color="secondary"> +Parts </Button>

            <Divider />
            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> PARADAS : </Typography> </Paper>
            {this.state.paradas.map((parada, idx) => (
                <div key={parada.key}>
                    <Paper className={classes.detalhes} elevation={1}> <Typography variant="p" component="p"> Parada- {parada.key} </Typography> </Paper>
                    <TextField id="inicio" required label="Inicio parada" type="datetime-local" variant="standard" value={parada.inicio} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParadas(idx)} />
                    <TextField id="fim" required label="Fim parada" type="datetime-local" variant="standard" value={parada.fim} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParadas(idx)} />
                    <TextField id="tipo_parada" name="tipo_parada" select required label="Tipo parada" className={classes.textField} value={parada.tipo_parada} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParadas(idx)}>
                      {tipo_parada.map(option => ( <MenuItem key={option.value} value={option.categoria}> {option.label} </MenuItem> ))}
                    </TextField>
                    <TextField id="subcategoria_parada" name="subcategoria_parada" select required label="Categoria Parada" className={classes.textField} value={parada.subcategoria_parada} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParadas(idx)}>
                      {
                        subcategoria_parada.filter(option => { return option.categoria === parada.tipo_parada }).map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))
                      }
                    </TextField>
                    <IconButton onClick={this.handleRemoveParada(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovaParada()}} color="secondary"> +Paradas </Button>

            <Button disabled={false} variant="contained" type="submit" color="primary" fullWidth={true} className={classes.button}> Debrifar! </Button>
          </form>
        </header>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id', }} message={ <span id="message-id">Repair enviado com sucesso!</span>} />
      </div>
    );
  }
}

export default withStyles(styles)(Repair);
