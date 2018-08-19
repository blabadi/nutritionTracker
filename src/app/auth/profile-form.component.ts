import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {Profile, User} from "./user";
import {UserService} from "./user-service";
import {UserStorage} from "./user-storage";
import { Observable } from 'rxjs';

@Component({
    selector: 'profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
    profileForm:FormGroup;
    profile:Profile;
    constructor(private fb: FormBuilder, private userSvc:UserService, private userStorage:UserStorage){
        this.createForm();
    }

    ngOnInit(){
        this.userSvc.getUserObservable().subscribe(u=>{
            console.log('user:', u);
            this.profile = u.profile;
            if (this.profile) {
                this.patchForm();
            }
        });
    }

    private patchForm(){
        this.profileForm.patchValue({
            heightCm: this.profile.heightCm,
            currentWeight: this.profile.currentWeight,
            targetWeight: this.profile.targetWeight,
            fatPercentage: this.profile.fatPercentage,
            fats: this.profile.targets.fats,
            carbs: this.profile.targets.carbs,
            proteins: this.profile.targets.protein,
            calories: this.profile.targets.calories
        });
    }
    private createForm() {
        this.profileForm = this.fb.group({
            //firstname: '',
            //lastname: '',
            heightCm: 0,
            currentWeight: 0,
            targetWeight: 0,
            fatPercentage: 0,
            fats: 0,
            carbs: 0,
            proteins: 0,
            calories: 0
        });
    }

    onSubmit() {
        let formModel = this.profileForm.value;
        console.log(formModel);

        let profile:Profile = new Profile();
        profile.fatPercentage=formModel.fatPercentage;
        profile.heightCm = formModel.heightCm;
        profile.currentWeight = formModel.currentWeight;
        profile.targetWeight = formModel.targetWeight;

        profile.targets = {
            calories: formModel.calories as number,
            carbs: formModel.carbs as number,
            fats: formModel.fats as number,
            protein: formModel.proteins as number
        };

        this.userSvc.updateProfile(profile).then(()=>{
            console.log('form reset');
            this.profileForm.reset();
            this.patchForm();
        });
    }
}