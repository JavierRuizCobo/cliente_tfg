import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../../core/models/exercise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-modal',
  standalone: true,
  imports: [FormsModule, SafeUrlPipe, CommonModule],
  templateUrl: './exercise-modal.component.html',
  styleUrl: './exercise-modal.component.css',
  providers: [SafeUrlPipe]
})
export class ExerciseModalComponent implements OnInit {

  @Input() exercise: Exercise | undefined;

  newExercise: Exercise = {
    name: '',
    video: '',
    difficulty: '',
    muscles: '',
    description: ''
  };

  videoPreviewUrl: SafeResourceUrl | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private exerciseService: ExerciseService,
    private sanitizer: DomSanitizer,
    private safeUrlPipe: SafeUrlPipe  
  ) {}

  ngOnInit(): void {
    if (this.exercise) {
      this.newExercise = { ...this.exercise };
      this.onYouTubeLinkChange();
    }
  }

  onYouTubeLinkChange(): void {
    const url = this.newExercise.video;
    const videoId = this.extractYouTubeVideoId(url!);
    if (videoId) {
      this.videoPreviewUrl = this.safeUrlPipe.transform(`https://www.youtube.com/embed/${videoId}`);
    } else {
      this.videoPreviewUrl = null;
    }
  }

  extractYouTubeVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  closeModal(): void {
    this.activeModal.close();
  }

  addExercise(form: { valid: any; }): void {
    if (form.valid) {
      if (this.exercise) {
        this.exerciseService.updateExercise(this.newExercise).subscribe({
          next: (res) => {
            console.log(res);
            this.activeModal.close('updated');
          },
          error: (e) => console.error(e)
        });
      } else {
        this.exerciseService.addExercise(this.newExercise).subscribe({
          next: (res) => {
            console.log(res);
            this.activeModal.close('created');
          },
          error: (e) => console.error(e)
        });
      }
    }
  }
}
