import {
  AssignmentManagerService,
  AssignmentPublisherService,
  AssignmentSubscriberService
} from './assignment.service'

export const assignmentPublisher = new AssignmentPublisherService('/assignments')
export const assignmentSubscriber = new AssignmentSubscriberService('/assignments')
export const assignmentManager = new AssignmentManagerService('/assignments')
