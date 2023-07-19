import { Component, OnInit } from '@angular/core';
import { Employe, Service} from '../employe';
import { EmployeService } from '../employe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private empService : EmployeService,
    private router : Router
    ){}
    employes: Employe[] = [];
    services: Service[] = [];
    employe : Employe = {
      id : 0,
      prenom : '',
      nom : '',
      email : '',
      salaire : 0,
      serviceId : 0
    };
    successMessage: string = '';
    errorMessage: string = '';
  ngOnInit(): void {
    // ...
    //this.employe.serviceId = this.services[0].id;
    this.empService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.empService.getAll().subscribe({
      next: (data) => {
        this.employes = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  isNameValid(): boolean {
    const namePattern = /^[A-Za-z]+$/;
    return namePattern.test(this.employe.prenom) && namePattern.test(this.employe.nom);
  }  
  getServiceName(serviceId: number): string {
    const service = this.services.find(s => s.id === serviceId);
    return service ? service.name : 'Inconnu';
  }
  add(){
    this.employe.serviceId = Number(this.employe.serviceId); // Convertir en nombre
    this.empService.add(this.employe).subscribe({
      next : (data) => {
        //console.log(data);
        this.successMessage = 'Employé ajouté avec succès.';
        this.router.navigate(['/employe/list']);
      },
      error : (err) => {
        this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de l\'employé.';
        console.log(err);
      }
    });
  }
  generateEmail() {
  const year = 2023;    
  this.employe.email = this.employe.prenom.slice(0, 2).toLocaleLowerCase() + this.employe.nom.toLocaleLowerCase() + year + '@groupeisi.com';
  }
}