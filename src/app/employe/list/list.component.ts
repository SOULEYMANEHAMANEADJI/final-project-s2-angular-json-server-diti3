import { Component, OnInit } from '@angular/core';
import { Employe, Service} from '../employe';
import { EmployeService } from '../employe.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employes : Employe[] = [];
  services : Service[] = [];
  searchtext : any;
  filteredEmployes: Employe[] = [];
  currentDate !: Date;
  currentTime !: string;
  loggedInUser !: string;
  constructor(private empService : EmployeService){}
  sortEmployesByFirstName(): void {
    this.employes.sort((a, b) => a.prenom.localeCompare(b.prenom));
  }
  ngOnInit(): void {
    //
    this.currentDate = new Date();
    //
    this.empService.getAll().subscribe(data => 
      {
        this.employes = data;
        this.sortEmployesByFirstName();
        //this.filteredEmployes = [...this.employes];
      }
    );
    this.empService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    setInterval(() => {
      const now = new Date();
      const hours = this.padDigits(now.getHours(), 2);
      const minutes = this.padDigits(now.getMinutes(), 2);
      const seconds = this.padDigits(now.getSeconds(), 2);
      this.currentTime = `${hours}:${minutes}:${seconds}`;    
    }, 1000);
  }
  padDigits(value: number, digits: number): string {
    return String(value).padStart(digits, '0');
  }
  getServiceName(serviceId: number): string {
    const service = this.services.find(s => s.id === serviceId);
    return service ? service.name : 'Inconnu';
  }
  // Première alternative
  /*
  filterEmployes(): void {
      this.filteredEmployes = this.employes.filter((employe) => {
      const searchTerm = this.searchtext.toLowerCase();
      const prenom = employe.prenom.toLowerCase();
      const nom = employe.nom.toLowerCase();
      const email = employe.email.toLowerCase();
      const salaire = employe.salaire.toString().toLowerCase();
      const service = this.getServiceName(employe.serviceId).toLowerCase();
      return prenom.includes(searchTerm) || nom.includes(searchTerm) || salaire.includes(searchTerm) || service.includes(searchTerm) || email.includes(searchTerm);
    });
  }

  onSearchChange(): void {
    this.filterEmployes();
  }
  */
  getfilteredEmployes() {
    if (this.searchtext) {
      const lowerCaseSearchText = this.searchtext.toLowerCase();
      return this.employes.filter(
        e =>
          e.prenom.toLowerCase().startsWith(lowerCaseSearchText) ||
          e.nom.toLowerCase().startsWith(lowerCaseSearchText) ||
          e.email.toLowerCase().startsWith(lowerCaseSearchText) ||
          e.salaire.toString().startsWith(this.searchtext) ||
          this.getServiceName(e.serviceId).toLowerCase().startsWith(lowerCaseSearchText)
      );
    } else {
      return this.employes;
    }
  }
  
  delete(id : number){
    let conf = confirm(`Voulez-vous vraiment supprimer l'employé numéro ${id} ?`);
    if(conf){
      this.empService.delete(id).subscribe({
        next : (data) => {
          this.employes = this.employes.filter(e => e.id != id);
          this.sortEmployesByFirstName();
          this.filteredEmployes = [...this.employes];
        }
      });
    }
  }  
}