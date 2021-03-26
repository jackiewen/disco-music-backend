export interface CRUD {
    list: (limit: number, page: number) => Promise<any>,
    create: (resource: any) => Promise<any>,
    updateById: (resource: any) => Promise<any>,
    readById: (resource: any) => Promise<any>,
    patchById: (resource: any) => Promise<any>
}