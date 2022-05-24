import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  combinations = [
    {
      name: 'concat',
      link: '/operators/combinations/combine-latest',
    },
    {
      name: 'forkJoin',
      link: '/operators/combinations/fork-join',
    },
    {
      name: 'concat',
      link: '/operators/combinations/concat',
    },
    {
      name: 'withLatestFrom',
      link: '/operators/combinations/with-latest-from',
    },
    {
      name: 'zip',
      link: '/operators/combinations/zip',
    },
  ];

  transformations = [
    {
      name: 'mergeMap',
      link: '/operators/transformation/merge-map',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
