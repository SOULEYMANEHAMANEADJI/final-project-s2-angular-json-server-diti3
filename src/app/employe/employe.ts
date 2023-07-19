export interface Employe {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    salaire: number;
    serviceId: number; // Ajout de la propriété serviceId pour la relation avec Service
}

export interface Service {
    id: number;
    name: string;
}