import { Component } from '@angular/core';
import { Exercise } from '../../../../core/models/exercise.model';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.css'
})
export class ExerciseDetailComponent {

  exercise: Exercise | undefined;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const exerciseId = params['id'];
      this.exerciseService.getExerciseById(exerciseId).subscribe({
        next: (data) => {
          if(data.video){
            data.video = this.getEmbeddedYouTubeUrl(data.video);
          }
          this.exercise = data;
        }, 
        error: (e) => console.error(e)
      });
    });
  }

  private getEmbeddedYouTubeUrl(url: string): string {
    const videoId = this.getYouTubeVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`;
  }

  private getYouTubeVideoId(url: string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }

}
