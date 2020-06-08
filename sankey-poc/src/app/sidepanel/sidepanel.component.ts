import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
    selector: 'app-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

    @Input("title") title: string;
    @Output() closePanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    uiOnCloseClicked() {
        this.closePanel.emit(true);
    }
}
