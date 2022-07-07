import { Component, Input, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-candidate-page',
  templateUrl: './create-candidate-page.component.html',
  styleUrls: ['./create-candidate-page.component.scss'],
})
export class CreateCandidatePageComponent implements OnInit {
  @Input('name') name = 'Candidate';
  route = { name: 'Create New Candidate', link: '/ungvien' };
  attach = { name: 'Attach CV' };
  attach2 = { name: 'Attach Portfolio' };
  pdfSrc = '';
  step = 3;
  candidate: any;
  objForAPI = {
    fullName: '',
    dob: '',
    gender: 0,
    phone: '',
    zalo: '',
    email: '',
    linkedIn: '',
    facebook: '',
    twiter: '',
    noiO: '',
    nationLive: 0,
    porvinceLive: 0,
    districtLive: 0,
    wardLive: 0,
    major: '',
    graduate: '',
    school: '',
    gpa: 0,
    awards: '',
    listSkill: [
      {
        typeSkill: 0,
        type: 0,
        level: 0,
        goal: '',
      },
    ],
    listExp: [
      {
        typeID: 0,
        firm: 'string',
        positiob: 'string',
        time: 'string',
      },
    ],
    recordStatus: 0,
  };
  constructor(
    private commonService: CommonService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {}
  getPdfSrc(src: string) {
    this.pdfSrc = src;
  }
  getStep(step: number) {
    this.step = step;
  }
  getName(name: string) {
    this.name = name;
  }
  onSubmit() {
    this.commonService.emitBahavior.next(true);

    (this.objForAPI.fullName = this.candidate.name),
      (this.objForAPI.dob = this.candidate.dob),
      (this.objForAPI.gender = this.candidate.gender),
      (this.objForAPI.phone = this.candidate.phone),
      (this.objForAPI.zalo = ''),
      (this.objForAPI.email = this.candidate.email),
      (this.objForAPI.linkedIn = this.candidate.linkedIn),
      (this.objForAPI.facebook = this.candidate.facebook),
      (this.objForAPI.twiter = this.candidate.twitter),
      (this.objForAPI.noiO = ''),
      (this.objForAPI.nationLive = 1),
      (this.objForAPI.porvinceLive = 2),
      (this.objForAPI.districtLive = 0),
      (this.objForAPI.wardLive = 0),
      (this.objForAPI.major = this.candidate.major),
      (this.objForAPI.graduate = this.candidate.graduate),
      (this.objForAPI.school = this.candidate.university),
      (this.objForAPI.gpa = this.candidate.gpa),
      (this.objForAPI.awards = this.candidate.awards),
      (this.objForAPI.recordStatus = 1);
    Swal.fire({
      text: 'Are you sure to edit this request?',
      iconHtml:
        ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
      showCancelButton: true,
      confirmButtonColor: '#309EFC',
      cancelButtonColor: '#8B94B2',
      confirmButtonText: 'Confirm',
      width: '380px',
    }).then((result) => {
      this.candidateService.insertCandidate(this.objForAPI).subscribe(
        (response: any) => {
          if (response.status == true) {
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed('Insert failed!!!');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Insert failed!!!');
        }
      );
    });
  }
  getCandidate($event: any) {
    this.candidate = $event;
  }
  getlistExp(arr: any) {
    this.objForAPI.listExp = arr;
  }
  getSkill(arr: any) {
    this.objForAPI.listSkill = arr;
  }
}
