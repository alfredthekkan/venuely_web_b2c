/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Retrieve a list of bookings
     * @returns Booking A list of bookings
     * @throws ApiError
     */
    public static getBookings(): CancelablePromise<Array<Booking>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookings',
        });
    }
    /**
     * Create a new booking
     * @param requestBody
     * @returns Booking Booking created successfully
     * @throws ApiError
     */
    public static postBookings(
        requestBody: Booking,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Retrieve a specific booking by ID
     * @param bookingId
     * @returns Booking A single booking
     * @throws ApiError
     */
    public static getBookings1(
        bookingId: string,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookings/{bookingId}',
            path: {
                'bookingId': bookingId,
            },
            errors: {
                404: `Booking not found`,
            },
        });
    }
    /**
     * Update a specific booking by ID
     * @param bookingId
     * @param requestBody
     * @returns Booking Booking updated successfully
     * @throws ApiError
     */
    public static putBookings(
        bookingId: string,
        requestBody: Booking,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/bookings/{bookingId}',
            path: {
                'bookingId': bookingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Booking not found`,
            },
        });
    }
    /**
     * Delete a specific booking by ID
     * @param bookingId
     * @returns void
     * @throws ApiError
     */
    public static deleteBookings(
        bookingId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/bookings/{bookingId}',
            path: {
                'bookingId': bookingId,
            },
            errors: {
                404: `Booking not found`,
            },
        });
    }
    /**
     * Retrieve available booking slots
     * @param requestBody
     * @returns string A list of available booking slots
     * @throws ApiError
     */
    public static postBookingsSlots(
        requestBody: {
            /**
             * Date for which to retrieve available slots
             */
            date: string;
            /**
             * List of service IDs to filter available slots
             */
            serviceIds: Array<string>;
        },
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookings/slots',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
