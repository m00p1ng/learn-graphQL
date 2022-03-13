function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permission => permissionsNeeded.includes(permission))

   if(!matchedPermissions.length) {
     throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
     `)
   }
}

export { hasPermission }