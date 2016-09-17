import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'comment',
    templateUrl: 'build/components/comment/comment.component.html'
})

export class CommentComponent {
  title = 'Comments';
  selectedComment: Comment;

  onSelect(comment: Comment): void {
    this.selectedComment = comment;
  }

 comments = [];

constructor() {
        //http.get('http://www.google.ca').subscribe(res => console.log(res));\
        this.comments = this.getComments();
    }

     private getComments() : Array<any> {

        return [

            {
              comment: "wow that's a nice pic",
              time: 1234567
            },

            {
              comment: "wow that's a pic",
              time: 1234589
            },

            {
              comment: "wow that's a bad pic",
              time: 1235833
            }

            ];
          }

    addComment(newComment: any) {

      if (newComment.comment && newComment.time) {
        this.comments.push(newComment);
    }
  }
}
