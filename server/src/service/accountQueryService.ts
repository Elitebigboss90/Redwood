import * as ServiceSpec from "../spec/service"

export class AccountQueryService extends ServiceSpec.AccountQueryService {
    queryAccountsAsPaginate(option: PaginateService.PaginateQuery, callback: Callback<PaginateService.PaginateResult<AccountService.Account>>) {
        let { pageIndex, pageSize } = option
        this.services.PaginateService.query({
            collection: this.services.AccountService.accountCollection,
            pageIndex,
            pageSize,
            query: {
                role: {
                    $ne: "admin"
                }
            }
        }, callback)
    }
}