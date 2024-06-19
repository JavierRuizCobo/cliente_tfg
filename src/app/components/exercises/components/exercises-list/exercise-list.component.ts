import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../../../core/models/exercise.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExerciseModalComponent } from '../exercise-modal/exercise-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { ExerciseService } from '../../services/exercise.service';
import { FormsModule } from '@angular/forms';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  difficultyFilter: string = 'all';
  searchTerm: string = '';
  isCoordinatorOrMonitor: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    private confirmModalService: ConfirmModalService

  ) {}

  ngOnInit(): void {
    this.getAllExercises();
    this.checkIfCoordinatorOrMonitor();
  }

  getAllExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.filterExercises();
      },
      error: (e) => console.error(e)
    });
  }

  filterExercises(): void {
    let filtered = this.exercises;

    if (this.difficultyFilter !== 'all') {
      filtered = filtered.filter(exercise => exercise.difficulty === this.difficultyFilter);
    }

    if (this.searchTerm) {
      filtered = filtered.filter(exercise => exercise.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
    }

    this.filteredExercises = filtered;
  }

  viewExercise(exercise: Exercise): void {
    this.router.navigate(['/ejercicios/detalle', exercise._id]);
  }

  checkIfCoordinatorOrMonitor(): void {
    this.authService.hasAnyRole(['monitor', 'coordinator']).subscribe({
      next: (data) => {
        this.isCoordinatorOrMonitor = data;
      },
      error: (e) => console.error(e)
    });
  }

  deleteExercise(exercise: Exercise): void {
    this.confirmModalService.confirm('Confirmar eliminación',
      '¿Estás seguro que quieres eliminar este ejercicio?')
      .then((confirmed: any) => {
        if (confirmed && exercise._id) {
        this.exerciseService.deleteExercise(exercise._id).subscribe({
          next: (res) => {
            this.getAllExercises();
          },
          error: (e) => console.error(e)
        });
        }
      });
  }

  editExercise(exercise: Exercise): void {
    const modalRef = this.modalService.open(ExerciseModalComponent, { size: 'xl' });
    modalRef.componentInstance.exercise = { ...exercise };
    
    modalRef.result.then((result) => {
      if (result === 'updated') {
        this.getAllExercises();
      }
    }, (reason) => {
      console.log(`Modal dismissed with reason: ${reason}`);
    });
  }

  openCreateExerciseModal(): void {
    const modalRef = this.modalService.open(ExerciseModalComponent, { centered: true, size: 'xl' });

    modalRef.result.then((result) => {
      this.getAllExercises();
    }, (reason) => {
      console.log(`Modal dismissed with reason: ${reason}`);
    });
  }
}
