import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})


export class FacturacionComponent implements OnInit {
  public costoData = [
    { none: "Fijo", actual: 123,proyectado: 123123 },
    { none: "Energía", actual: 123,proyectado: 123123 },
    { none: "Potencia contratada", actual: 123,proyectado: 123123 },
    { none: "Potencia adquirida", actual: 123,proyectado: 123123 },
    { none: "Potencia excedida", actual: 123,proyectado: 123123 },
    { none: "Cos(fi)", actual: 123,proyectado: 123123 },
    { none: "total", actual: 123,proyectado: 123123 } // Ojo con este, es un sumarizado
  ];
  
   public energiaActivaData = [
     
    { none: "- E. Activa", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00', total: '12.34 kWH $ 123123.00' },
    { none: "Franja h 1", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00', total: '12.34 kWH $ 123123.00' },
    { none: "Franja h 2", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00', total: '12.34 kWH $ 123123.00' },
    { none: "+ E. Activa", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00', total: '12.34 kWH $ 123123.00' },
    { none: "+ E. Reactiva", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00', total: '12.34 kWH $ 123123.00' },
    { none: "+ Cos(fi)", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00', total: '12.34 kWH $ 123123.00' }
  ];

  public demandaPonteciaData = [
    
    { none: "- P. Adquirida 1", fecha:'12/04/2020', total: "12.2 kW $ 1.34", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00' },
    { none: "Franja h 1", fecha:'12/04/2020', total: "12.2 kW $ 1.34", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00' },
    { none: "Franja h 2", fecha:'12/04/2020', total: "12.2 kW $ 1.34", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00' },
    { none: "+ P. Adquirida 2", fecha:'12/04/2020', total: "12.2 kW $ 1.34", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00' },
    { none: "+ P. Adquirida N", fecha:'12/04/2020', total: "12.2 kW $ 1.34", fase_r_disp_1: '12.34 kWH $ 123123.00', fase_s_disp_2: '12.34 kWH $ 123123.00', fase_t_disp_n:'12.34 kWH $ 123123.00' },
    
  ];
  constructor() { }

  
  
  ngOnInit(): void {
  }

}
