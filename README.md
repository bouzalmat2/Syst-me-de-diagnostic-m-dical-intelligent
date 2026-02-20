# MediCare - Système de Gestion Médicale (Microservices & IA)

##  Description
**MediCare** est une plateforme santé innovante basée sur une architecture **Microservices**. Le système permet une gestion fluide des patients et des médecins, tout en intégrant un service d'analyse intelligente (IA) pour le diagnostic médical.

---

##  Architecture du Système
Le projet repose sur une architecture distribuée pour garantir la scalabilité et la maintenance :

* **Service Discovery:** Netflix Eureka (Registre des services).
* **API Gateway:** Spring Cloud Gateway (Point d'entrée unique).
* **Sécurité:** Authentification **Stateless** via **JWT**.
* **Inter-service Communication:** RestTemplate / OpenFeign.
* **Base de Données:** MySQL (Persistance avec Spring Data JPA/Hibernate).
* **Intelligence Artificielle:** Backend spécialisé en **FastAPI (Python)**.

---

##  Stack Technique
* **Backend:** Spring Boot 3.x, Spring Cloud, Spring Security.
* **IA:** FastAPI, Python 3.x.
* **Database:** MySQL & phpMyAdmin.
* **Outils:** Postman (Testing API), Maven (Gestion des dépendances).

---

## Structure des Microservices
| Service | Port | Description |
| :--- | :--- | :--- |
| **Eureka Server** | `8761` | Serveur de nomnage et découverte. |
| **Gateway Service** | `8888` | Routage, CORS et Filtre de sécurité. |
| **Auth Service** | `8080` | Gestion des comptes et génération JWT. |
| **Patient Service** | `8081` | Gestion des dossiers et profils patients. |
| **Doctor Service** | `8082` | Gestion des médecins et rendez-vous. |
| **AI Service** | `8085` | Pont Java-Python pour les analyses médicales. |

---

##  Sécurité & Flux JWT
Le projet implémente un **AuthenticationFilter** au niveau de la Gateway :
1.  **Interception:** La Gateway intercepte chaque requête vers les services protégés.
2.  **Validation:** Vérification de la signature du Token JWT avec une `Secret Key`.
3.  **Propagation:** Extraction des **Claims** (Role, UserID) et injection dans les headers de la requête.
4.  **Stateless:** Aucune session n'est stockée côté serveur, optimisant les ressources.

---

## Intégration de l'IA
L'IA est connectée via un microservice dédié (`ai-service`) qui agit comme un **Proxy REST**. Les données sont échangées au format **JSON**, permettant une analyse rapide des symptômes et des données médicales transmises depuis le Frontend React.

---

##  Installation

### 1. Backend (Java)
```bash
# Cloner le dépôt
git clone https://github.com/bouzalmat2/Syst-me-de-diagnostic-m-dical-intelligent.git

# Compiler le projet
mvn clean install
