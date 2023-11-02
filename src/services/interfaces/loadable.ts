interface LoadAble {
  /**
   * fetch data from supabase or given source then save it to indexed db
   */
  load: () => any,

  /**
   * get all data from indexed db
   */
}
