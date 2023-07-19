import { Component, OnInit } from '@angular/core';
import { Service } from '../employe';
import { EmployeService } from '../employe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit{
  constructor( private empService : EmployeService,
    private router : Router){}
    services : Service [] = [];
    // Déclarez la variable serviceExists dans votre composant
    serviceExists: boolean = false;
    service : Service = {
      id : 0,
      name : ''
    }
  ngOnInit(): void {
    this.empService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  addService() {
    // Convertir l'ID du service en nombre
    this.service.id = Number(this.service.id);
     
    // Vérifier si le service existe déjà dans la liste
    const existingService = this.services.find(s => s.name.toUpperCase() === this.service.name.toUpperCase());
    
    if (existingService) {
        // Le service existe déjà, afficher un message d'erreur ou prendre une autre action appropriée
        this.serviceExists = true;
    } else {
        // Mettre le nom du service en majuscules
        this.service.name = this.service.name.toUpperCase();
        // Le service n'existe pas encore, ajouter le service
        this.empService.addS(this.service).subscribe({
            next: (data) => {
                //console.log(data);
                this.router.navigate(['/employe/list']);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
}
