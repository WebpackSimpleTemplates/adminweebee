export function authority(userId: number, userAuthorities: string[], authority: string, data: any) {
  const argsUserId = data?.userId || +data?.params?.id;

  if (authority === "edit-users-authorities") {
    return argsUserId !== userId && userAuthorities.includes('ROLE_ADMIN');
  }

  if (authority === "edit-users-contacts" || authority === "edit-users-password") {
    return argsUserId === userId;
  }

  if (authority.startsWith('edit-users')) {
    return argsUserId === userId || userAuthorities.includes('ROLE_ADMIN');
  }

  if (authority === 'remove-users') {
    return argsUserId !== userId && userAuthorities.includes('ROLE_ADMIN');
  }

  if (authority === 'add-users') {
    return userAuthorities.includes('ROLE_ADMIN');
  }

  if (authority === 'see-users') {    
    return argsUserId === userId || userAuthorities.includes('ROLE_USER') || userAuthorities.includes('ROLE_ADMIN');
  }

  if (authority === 'see-tasks') {
    return userAuthorities.includes("ROLE_ADMIN") || userAuthorities.includes('ROLE_TASKS_MANAGER') || userAuthorities.includes('ROLE_TASKS_WORKER');
  }

  if (authority === 'see-calendar') {
    return userAuthorities.includes("ROLE_ADMIN") || userAuthorities.includes('ROLE_CALENDAR_MANAGER') || userAuthorities.includes('ROLE_CALENDAR_WATCHER');
  }

  return true;
}