import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe, Service} from '../employe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private empService : EmployeService,
    private router : Router,
    private route : ActivatedRoute
    ){}
    services : Service[] = [];
    employe : Employe = {
    id : 0,
    prenom : '',
    nom : '',
    email : '',
    salaire : 0,
    serviceId: 0
  }
  successMessage: string = '';
  errorMessage: string = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'))
      this.getById(id)
    });
    this.empService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getById(id : number){
    this.empService.getById(id).subscribe((data) => {
      this.employe = data
    })
  }
  isNameValid(): boolean {
    const namePattern = /^[A-Za-z]+$/;
    return namePattern.test(this.employe.prenom) && namePattern.test(this.employe.nom);
  }  
  update(){
    this.employe.serviceId = Number(this.employe.serviceId); // Convertir en nombre
    this.empService.update(this.employe).subscribe({
      next : (data) => {
        this.successMessage = 'Employé modifié avec succès.';
        this.router.navigate(["/employe/list"])
      },
      error : (err) => {
        this.errorMessage = 'Une erreur s\'est produite lors de la modification de l\'employé.';
        console.log(err)
      }
    })
  }
  generateEmail() {
  const year = 2023;
  this.employe.email = this.employe.prenom.slice(0, 2).toLocaleLowerCase() + this.employe.nom.toLocaleLowerCase() + year + '@groupeisi.com';
  }
}

